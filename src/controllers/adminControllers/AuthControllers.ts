import {Request, Response} from 'express';
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import { compare, encrypt } from '../../utils/hash';
import { badRequest, serverError, statusOkay, unauthAccess, wrongCredentials } from '../../views/view';
import AdminModel from '../../models/Admins';
config();


export async function registerAdminController(req: Request, res: Response) {
    try {
        const { name, dept, email, pass, isSuperUser} = req.body;
        if (!name || !dept || !email || !pass || isSuperUser === undefined) {
            badRequest(res);
            return;
        }
        req.body.pass = await encrypt(req.body.pass);
        const newAdmin = new AdminModel(req.body);
        await newAdmin.save();
        statusOkay(res, {message: "Admin Added Successfully"});
    } catch(err) {
        serverError(res, err);
    }
}


export async function deleteAdminController(req: Request, res: Response) {
    try {
        const empNo = req.params.no.toUpperCase();
        await AdminModel.deleteOne({empNo: empNo});
        statusOkay(res, {message: "Admin Deleted Successfully"});
    } catch(err) {
        serverError(res, err);
    }
}


export async function loginAdminController(req: Request, res: Response) {
    try {
        const { empNo, pass } = req.body;
        if (!pass) {
            badRequest(res);
            return;
        }
        const empData = await AdminModel.findOne({ empNo }).select("_id name pass isSuperUser");
        if (!empData || !await compare(pass, empData.pass!)) {
            wrongCredentials(res);
            return;
        }
        const { _id, name, isSuperUser } = empData;
        const accessToken = jwt.sign({ _id, isAccessToken: true }, (process.env.SECRET_KEY as string), {expiresIn: '1h'});
        const refreshToken = jwt.sign({ _id, isAccessToken: false }, (process.env.SECRET_KEY as string), {expiresIn: '10d'});
        statusOkay(res, { accessToken, refreshToken, name, empNo, isSuperUser });
    }
     catch(err) {
        serverError(res, err);
    }
}


export async function issueAdminToken(req: Request, res: Response) {
    try {
        const _id = res.locals._id;
        const accessToken = res.locals.accessToken;
        const refreshToken = res.locals.refreshToken;
        const empData = await AdminModel.findById({ _id }).select("name empNo isSuperUser");
        if (!empData) {
            unauthAccess(res);
            return;
        }
        const { name, isSuperUser, empNo } = empData;
        statusOkay(res, { accessToken, refreshToken, name, empNo, isSuperUser });
    } catch(err) {
        unauthAccess(res);
    }
}