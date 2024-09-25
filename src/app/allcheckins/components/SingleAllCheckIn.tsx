import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
// import Button from '@mui/material/Button';
import Typography from "@mui/material/Typography";
import { Avatar, Button } from "@mui/material";
import DetailModal from "./DetailModal";
import { Data } from "../page";
import moment from "moment";

export default function SingleAllCheckIn({image,title,createAt}:Data) {
  const [isShowDetail, SetIsShowDetail] = React.useState(false);
  return (
    <div>
      <div onClick={() => SetIsShowDetail(true)} className="cursor-pointer">
        <Card
          className="px-5 py-6 bg-white w-80 max-h-fit rounded-lg relative single-checkin-card shadow-shadow1"
        >
          <CardMedia
            className="rounded-xl "
            sx={{ height: 160, width: 270 }}
            style={{
              width: "100%",
              height: "160px",
            }}
            image={image}
            title="green iguana"
          />
          <Button
            size="large"
            className="rounded-full bg-primaryPurple text-white capitalize absolute top-10 right-8 px-2.5 py-1.5"
          >
            Checked In
          </Button>
          <CardContent className="px-0 pt-3" style={{ paddingBottom: 0 }}>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              className="text-xl"
            >
             {title}
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: "text.secondary" }}
              className="text-base text-primaryGray"
            >
             {moment(createAt).format('Do MMM, YYYY')}
            </Typography>
            <div className="flex gap-2.5 items-center pt-1.5">
              <Avatar
                src="/Avatar.png"
                style={{ width: "32px", height: "32px" }}
                className="object-contain"
              />
              <p className="text-base text-black">
                <span className="font-medium">Owner:</span>{" "}
                <span className="font-normal text-sm">John Doe</span>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

          <DetailModal open={isShowDetail} setOpen={SetIsShowDetail} image={image} />
    </div>
  );
}
