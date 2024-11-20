module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      // Confirma que o JSX/TSX está sendo tratado pelo Babel
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      "nativewind/babel",
    ],
    // Adicione suporte explícito para arquivos .tsx
    overrides: [
      {
        test: /\.tsx?$/, // Arquivos TSX e TS
        presets: [
          // Adiciona suporte para TSX especificamente
          ["babel-preset-expo", { jsxImportSource: "nativewind" }],
        ],
      },
    ],
  };
};
