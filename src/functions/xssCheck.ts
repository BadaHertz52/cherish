export const XSSCheck = (str: string, level?: number) => {
  if (!level || level == 0) {
    str = str.replace(/\<|\>|\"|\'|\%|\;|\(|\)|\&|\+|\-/g, '');
  } else if (level == 1) {
    str = str.replace(/\</g, '&lt;');
    str = str.replace(/\>/g, '&gt;');
  }
  return str;
};
