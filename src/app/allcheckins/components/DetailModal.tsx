import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import Input from "@mui/material/Input";
import { styled } from "@mui/material/styles";
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import { CardMedia } from "@mui/material";
const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 699,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 5,
};

export default function DetailModal({
  open,
    setOpen,
  image
}: {
  open: boolean;
        setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  image:string
}) {
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="flex justify-between items-center bg-gray-100 py-4 px-5 rounded-t-xl">
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Detail
            </Typography>
            <CloseOutlinedIcon />
          </div>
                  <div className="py-14 ps-12 px-8">
                      <div className="flex justify-between w-full">           
                      <div className="flex-1 flex flex-col gap-8">
                          <div className="flex w-full justify-between">
                              <h2>
                             Booking ID
                              </h2>
                             <p className="border px-3 flex justify-start items-center w-32 rounded-sm">12345678</p>
                              </div>
                              <div className="flex w-full justify-between">
                              <h2>
                              Rooms
                                  </h2>
                                  <p className="border  w-8 h-8 px-3 py-1.5 flex justify-center items-center">8</p>
                              </div>
                              <div className="flex w-full justify-between">
                              <h2>
                              Number of Guest
                              </h2>
                              <p className="border  w-8 h-8 px-3 py-1.5 flex justify-center items-center">4</p>
                              </div>
                              <div className="flex w-full justify-between">
                              <h2>
                              Booked Date
                                  </h2>
                                  <p className="border   h-8 px-3  flex justify-between items-center gap-3">
                                      <span>12-03-20234</span>
                                      <CalendarMonthOutlinedIcon style={{color:"gray"}}/>
                                  </p>
                              </div>
                      </div>
                          <div className="flex-1 flex justify-end items-center">
                          <CardMedia
                        className="rounded-xl "
                        sx={{ height: 160, width: 270 }}
                        image={image}
                        title="green iguana"
                    />
                          </div>       
                 </div>
                          
            <div className="flex gap-2 items-center mt-10 justify-end">
              <Button
                variant="outlined"
                className="border-neutral-300 bg-transparent text-black rounded-full capitalize"
                onClick={handleClose}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                className="border-neutral-300 bg-primaryPurple text-white rounded-full capitalize"
              >
                ok
              </Button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
