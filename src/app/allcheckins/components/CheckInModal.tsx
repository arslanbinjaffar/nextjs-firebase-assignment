import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import Input from "@mui/material/Input";
import { styled } from "@mui/material/styles";
import Image from "next/image";
import db, { uploadImage } from "@/app/firebase/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { v4 } from "uuid";
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
  width: 572,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 5,
};

export default function CheckInModal({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [formData, setFormData] = React.useState({
    title: "",
  });
  const fileUploadRef = React.useRef<HTMLInputElement | null>(null);
    const [fileUpload, setFileUpload] = React.useState<File | null>(null);
    const [loading,setLoading]=React.useState<any>()
  const handleClose = () => setOpen(false);
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
        const selectedFile = event.target.files[0];
        
      setFileUpload(selectedFile);
    }
  };
  const handleUploadFile = async () => {
    try {
      const url = await uploadImage(fileUpload);
      return url;
    } catch (error) {
      return error;
    }
  };
  const createProject = async () => {
      if (formData.title.trim()==="" ) {
          alert("title required")
          return;
      }

      if (!fileUpload) {
          alert("image is required")
          return;
      }
      try {
    setLoading(true)
      const url = await handleUploadFile();
      if (url) {
        const collectionRef = collection(db, "/users");
        const dataToCreate = {
          id: v4(),
          title: formData.title,
          image: url,
          createAt: Date.now(),
          updateAt: Date.now(),
        };
        await addDoc(collectionRef, dataToCreate);
        console.log("Document successfully created!");
          setLoading(false)
          setFormData({ title: "" })
          setFileUpload(null)
        handleClose();
      }
    } catch (error) {
      console.error("Error creating document:", error);
    }
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={undefined}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="flex justify-between items-center bg-gray-100 py-4 px-5 rounded-t-xl">
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Add Check In
                      </Typography>
                          <CloseOutlinedIcon onClick={()=>setOpen(false) } />
          </div>
          <div className="py-4 px-5">
            <div className="flex gap-3.5 flex-col">
              <Typography id="modal-modal-title" variant="h6" component="label">
                Title
              </Typography>
                          <Input
                              required={true}
                className="border outline-none w-full shadow-shadow2 py-2.5 px-3 before:content-none after:content-none rounded-lg
                      border-primaryGray2 border-solid 
                      "
                value={formData.title}
                onChange={(event) =>
                  setFormData({ ...formData, title: event.target.value })
                }
                placeholder="Enter title"
              />
            </div>
            <div className="flex gap-3.5 flex-col mt-5">
              <Typography id="modal-modal-title" variant="h6" component="label">
                Upload Image
              </Typography>
              {fileUpload ? (
              <img src={fileUpload ? URL.createObjectURL(fileUpload) : ''} alt="Preview" className="h-[167px] object-contain w-full rounded-md"/>
              ) : (
                <div
                  onClick={() => {
                    if (fileUploadRef.current) {
                      fileUploadRef.current.click();
                    }
                  }}
                  className="border-[2px] border-primaryGray2 border-dashed py-6 flex items-center flex-col"
                  style={{
                    borderImage:
                      "linear-gradient(90deg, black 50%, rgba(0,0,0,0) 0%) 1;",
                  }}
                >
                  <Image
                    src={"/Inbox.svg"}
                    alt="inbox icon"
                    width={48}
                    height={48}
                  />
                  <div className="flex items-center flex-col text-center">
                    <h5 className="text-black hover:underline cursor-pointer">
                      Click or drag file to this area to upload
                    </h5>
                    <p className="text-neutral-400">
                      Support for a single or bulk upload. Strictly prohibit
                      from uploading company data or other band files
                    </p>
                  </div>
                  <input
                    type="file"
                    ref={fileUploadRef}
                    onChange={(event) => handleFileChange(event)}
                    className=""
                    accept="image/*"
                    style={{
                      visibility: "hidden",
                    }}
                  />
                </div>
              )}
            </div>
            <div className="flex gap-2 items-center mt-10 justify-end">
                          <Button
                              disabled={loading}
                variant="outlined"
                className="border-neutral-300 bg-transparent text-black rounded-full capitalize"
                onClick={handleClose}
              >
                Cancel
              </Button>
              <Button
                              variant="contained"
                              disabled={loading}
                className="border-neutral-300 bg-primaryPurple text-white rounded-full capitalize"
                onClick={createProject}
                          >
                              Add  {loading && "...."}
                              
                             
                             
                
              </Button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
