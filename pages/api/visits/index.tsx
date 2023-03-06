import { NextApiRequest, NextApiResponse } from "next";

interface Data{
    Visits : number
}

let visits = 0;

export default function (req: NextApiRequest, res: NextApiResponse<Data>) {
    res.status(200).json({ Visits: ++visits })
}