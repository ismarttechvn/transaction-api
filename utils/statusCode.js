const CodeData = {
  OKE: {
    code: 200,
    message: "Oke",
  },
  NOT_FOUND: {
    code: 401,
    message: "Not found",
  },
  INTERNAL_ERROR: {
    code: 500,
    message: "Internal error",
  },
};

exports.Code = CodeData;

exports.getMessage = (searchCode) => {
  const entry = Object.values(CodeData).find(({ code }) => code === searchCode);
  return entry ? entry.message : "Code not found";
};
