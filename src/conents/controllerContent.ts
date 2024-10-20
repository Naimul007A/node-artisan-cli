function ControllerContent(name: string, type: string="ts", service: boolean = false, serviceName: string = "") {
    const tsControllerContent = `
import { Request, Response, NextFunction } from "express";
import createError from "http-errors";
/**
* Display a listing of the resource.
*/
async function ${name}Index(req: Request, res: Response, next: NextFunction) {
    try {
        // main code here
        res.status(200).json({
            success: {
                message: "${name}s fetched successfully.",
                data: "",
            },
        });
    } catch (error) {
        next(error);
    }
}
/**
* Store a newly created resource in storage.
*/
async function ${name}Store(req: Request, res: Response, next: NextFunction) {
    try {
        // main code here
        res.status(200).json({
            success: {
                message: "${name} created successfully.",
                data: "",
            },
        });
    } catch (error) {
        next(error);
    }
}
/**
* Show the specified resource for editing or display.
*/
async function ${name}Show(req: Request, res: Response, next: NextFunction) {
    try {
        // main code here
        res.status(200).json({
            success: {
                message: "${name} fetched successfully.",
                data: "",
            },
        });
    } catch (error) {
        next(error);
    }
}
/**
* Update the specified resource in storage.
*/
async function ${name}Update(req: Request, res: Response, next: NextFunction) {
    try {
        // main code here
        res.status(200).json({
            success: {
                message:"${name} updated successfully.",
                data: "",
            },
        });
    } catch (error) {
        next(error);
    }
}
/**
* Remove the specified resource from storage.
*/
async function ${name}Destroy(req: Request, res: Response, next: NextFunction) {
    try {
        // main code here
        res.status(200).json({
            success: {
                message:" ${name} deleted successfully.",
                data: "",
            },
        });
    } catch (error) {
        next(error);
    }
}
export { ${name}Index, ${name}Store, ${name}Show, ${name}Update, ${name}Destroy };
    `;
    const jsControllerContent = `
import createError from "http-errors";
/**
* Display a listing of the resource.
*/
async function ${name}Index(req, res, next) {
    try {
        // main code here
        res.status(200).json({
            success: {
                message:" ${name}s fetched successfully.",
                data: "",
            },
        });
    } catch (error) {
        next(error);
    }
}
/**
* Store a newly created resource in storage.
*/
async function ${name}Store(req, res, next) {
    try {
        // main code here
        res.status(200).json({
            success: {
                message: "${name} created successfully.",
                data: "",
            },
        });
    } catch (error) {
        next(error);
    }
}
/**
* Show the specified resource for editing or display.
*/
async function ${name}Show(req, res, next) {
    try {
        // main code here
        res.status(200).json({
            success: {
                message: "${name} fetched successfully.",
                data: "",
            },
        });
    } catch (error) {
        next(error);
    }
}
/**
* Update the specified resource in storage.
*/
async function ${name}Update(req, res, next) {
    try {
        // main code here
        res.status(200).json({
            success: {
                message: "${name} updated successfully.",
                data: "",
            },
        });
    } catch (error) {
        next(error);
    }
}
/**
* Remove the specified resource from storage.
*/
async function ${name}Destroy(req, res, next) {
    try {
        // main code here
        res.status(200).json({
            success: {
                message: "${name} deleted successfully.",
                data: "",
            },
        });
    } catch (error) {
        next(error);
    }
}
    module.exports = { ${name}Index, ${name}Store, ${name}Show, ${name}Update, ${name}Destroy };
    `;
    const serviceTsControllerContent = `import { Request, Response, NextFunction } form "express";
import createError from "http-errors";
import { ${serviceName} } from "../services/${serviceName}";
`;
    if (type === "ts") {
        if (service) {
            return serviceTsControllerContent;
        } else {
            return tsControllerContent;
        }
    } else {
        if (service) {
            return "";
        } else {
            return jsControllerContent;
        }
    }
}
export { ControllerContent };
