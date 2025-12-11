import type { Rule } from "eslint";
import type {
  CatchClause,
  IfStatement,
  Statement,
  ThrowStatement,
} from "estree";

// Helper function to check if a statement is a valid throw of the caught error
function isValidThrow(statement: Statement, paramName: string): boolean {
  if (statement.type !== "ThrowStatement") {
    return false;
  }
  const thrownExpression = statement.argument;
  return (
    thrownExpression?.type === "Identifier" &&
    thrownExpression.name === paramName
  );
}

// Helper function to check if a statement ends with a valid rethrow
// This handles both direct throw statements and if-else chains ending with throw
function endsWithValidRethrow(
  statement: Statement,
  paramName: string,
): boolean {
  // Direct throw statement
  if (statement.type === "ThrowStatement") {
    return isValidThrow(statement, paramName);
  }

  // If statement with else clause
  if (statement.type === "IfStatement") {
    const ifStmt = statement as IfStatement;

    // Must have an else clause
    if (!ifStmt.alternate) {
      return false;
    }

    // Check the else clause - it could be another if-else or a block
    if (ifStmt.alternate.type === "IfStatement") {
      // Nested if-else (else if chain)
      return endsWithValidRethrow(ifStmt.alternate, paramName);
    }

    if (ifStmt.alternate.type === "BlockStatement") {
      const elseBody = ifStmt.alternate.body;
      if (elseBody.length === 0) {
        return false;
      }
      const lastInElse = elseBody[elseBody.length - 1];
      return endsWithValidRethrow(lastInElse, paramName);
    }

    // Direct statement in else (e.g., `else throw error;`)
    return endsWithValidRethrow(ifStmt.alternate, paramName);
  }

  return false;
}

const rule: Rule.RuleModule = {
  meta: {
    type: "problem",
    docs: {
      description:
        "Enforce that catch blocks end with rethrowing the caught error",
      category: "Best Practices",
      recommended: true,
    },
    messages: {
      missingRethrow:
        "Catch block must end with a throw statement that rethrows the caught error (throw {{paramName}})",
      wrongErrorThrown:
        'Catch block must rethrow the caught error "{{paramName}}", not "{{thrownName}}"',
    },
    schema: [],
  },
  create(context) {
    return {
      CatchClause(node: CatchClause) {
        const catchBody = node.body;
        const catchParam = node.param;

        // Get the caught error parameter name (e.g., 'error', 'err', 'e')
        const paramName = catchParam && catchParam.type === "Identifier"
          ? catchParam.name
          : "error";

        // Check if catch block has statements
        if (!catchBody.body || catchBody.body.length === 0) {
          context.report({
            node: catchBody,
            messageId: "missingRethrow",
            data: { paramName },
          });
          return;
        }

        // Get the last statement in the catch block
        const lastStatement = catchBody.body[catchBody.body.length - 1];

        // EXCEPTION: If the catch block only contains a single throw statement,
        // allow throwing a different error (e.g., transforming to a domain-specific error)
        if (
          catchBody.body.length === 1 && lastStatement.type === "ThrowStatement"
        ) {
          return;
        }

        // Check if the last statement ends with a valid rethrow
        // This handles both direct throw statements and if-else chains
        if (endsWithValidRethrow(lastStatement, paramName)) {
          return;
        }

        // Check if the last statement is a throw statement (for better error message)
        if (lastStatement.type === "ThrowStatement") {
          const thrownExpression = lastStatement.argument;

          if (thrownExpression && thrownExpression.type === "Identifier") {
            const thrownName = thrownExpression.name;
            if (thrownName !== paramName) {
              context.report({
                node: thrownExpression,
                messageId: "wrongErrorThrown",
                data: {
                  paramName,
                  thrownName,
                },
              });
            }
          } else if (thrownExpression) {
            context.report({
              node: thrownExpression,
              messageId: "wrongErrorThrown",
              data: {
                paramName,
                thrownName: "a different value",
              },
            });
          }
          return;
        }

        // Not a valid pattern
        context.report({
          node: lastStatement,
          messageId: "missingRethrow",
          data: { paramName },
        });
      },
    };
  },
};

export default rule;
