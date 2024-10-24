import { Router, Response, Request } from "express";
import OrganizationModel from "../schema/Org.schema";
import { JwtAuth } from "../middlewares/JwtAuth";

const app = Router();

app.post("/", async (req: Request, res: Response) => {
  try {
    const userId = req.body.userId;

    if (!userId) {
      return res.json({
        status: "Failed",
        response: {},
        error: "Not Authenticated !",
      });
    }

    const newOrganization = await OrganizationModel.create({
      userId: userId,
      OrganizationName: req.body.OrganizationName,
      OrganizationWebsite: req.body.OrganizationWebsite,
      OrganizationPhone: req.body.OrganizationPhone,
      isActive: req.body.isActive,
    });

    res.json({
      status: "Success",
      response: {
        data: newOrganization,
      },
    });
  } catch (error) {
    console.log("Error:", error);
    res.json({
      status: "Failed",
      response: {},
      error: (error as Error).message,
    });
  }
});

app.get("/", async (req: Request, res: Response) => {
  try {

    const userIdFromQuery = req.query.UserId;

    if (!userIdFromQuery) {
      return res.json({
        status: "Failed",
        response: {},
        error: "UserId query parameter not found",
      });
    }

    const allOrg = await OrganizationModel.find({
      userId: userIdFromQuery,
    });

    res.json({
      status: "Success",
      response: {
        data: allOrg,
      },
    });
  } catch (error) {
    res.json({
      status: "Failed",
      response: {},
      error: (error as Error).message,
    });
  }
});

export default app;
