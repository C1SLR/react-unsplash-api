import { Box, Button, Modal } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React from "react";

const ImageModal = ({ image, open, handleClose }) => {
  if (!image) return null;
  return (
    <Modal open={open} onClose={handleClose}>
      <Box className="xl:w-4/12 lg:w-6/12 md:w-8/12 bg-white w-10/12 absolute justify-self-center top-[10vh] rounded-2xl overflow-hidden">
        <Box>
          <Box>
            <button className="flex justify-self-end pt-2 pr-2 cursor-pointer">
              <CloseIcon onClick={handleClose} />
            </button>
            <img
              className="px-5 rounded-lg max-h-[50vh] justify-self-center"
              src={image.urls.raw}
              alt={image.alt_description}
            />
          </Box>
          <Box>
            <Box className="justify-self-center w-full px-5 my-5">
              <p>{image.user.bio || "Bio is not Available"}</p>
            </Box>
            <Box className="flex gap-2 w-11/12 justify-between justify-self-center items-center my-2">
              <Box>
                <p>{image.user.location}</p>{" "}
              </Box>
              <Box className="flex gap-2 items-center">
                <img
                  className="rounded-full ring-3 ring-purple-600"
                  src={image.user.profile_image.small}
                  alt={image.user.name}
                />
                <p className="font-bold">{image.user.name}</p>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default ImageModal;
