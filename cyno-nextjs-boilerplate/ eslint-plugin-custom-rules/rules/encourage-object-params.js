/* eslint-disable no-restricted-syntax */
// @ts-nocheck

module.exports = {
  meta: {
    type: "suggestion",
    docs: {
      description: "Encourage using object params when there are multiple arguments",
      category: "Best Practices",
      recommended: false,
    },
    fixable: null,
    hasSuggestions: true,
    schema: [
      {
        type: "object",
        properties: {
          minParams: {
            type: "number",
          },
        },
        additionalProperties: false,
      },
    ],
  },

  create: function (context) {
    const minParams = context.options[0]?.minParams || 2

    return {
      FunctionDeclaration: checkFunctionParams,
      FunctionExpression: checkFunctionParams,
      ArrowFunctionExpression: checkFunctionParams,
    }

    function checkFunctionParams(node) {
      if (node.params.length >= minParams) {
        // Check if all params are simple identifiers (not destructured)
        const allSimpleParams = node.params.every(param => param.type === "Identifier")

        if (allSimpleParams) {
          context.report({
            node: node,
            message: `Function has ${node.params.length} parameters. Consider using an object parameter for better clarity when there are ${minParams} or more parameters.`,
            suggest: [
              {
                desc: "Use an object parameter",
                fix: function(fixer) {
                  const paramNames = node.params.map(param => param.name)
                  const objectParam = `{ ${paramNames.join(", ")} }`

                  return fixer.replaceText(node.params[0], objectParam)
                },
              },
            ],
          })
        }
      }
    }
  },
}
