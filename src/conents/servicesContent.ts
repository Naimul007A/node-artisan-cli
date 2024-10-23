function serviceContent(name: string, type: string = "ts") {
    const tsServiceContent = `/**
* @description ${name.toLowerCase()}Service
**/
const ${name.toLowerCase()}Index = async () => {
    try {
        // your code here
        return {
            message: "success"
        };
    } catch (error) {
        throw error;
    }
}
export { ${name.toLowerCase()}Index };`;
    const jsServiceContent = `/**
* @description ${name}service
**/
const ${name.toLowerCase()}Index = async ({ email, role }) => {
 try {
  // your code here
  return {
  message: "success"
  };
 } catch (error) {
    throw error;
 }
}
module.exports { ${name.toLowerCase()}Index };`;
    if (type === "ts") {
        return tsServiceContent;
    } else {
        return jsServiceContent;
    }
}
export { serviceContent };
