import React, { useEffect, useState } from "react";
import { fetchUnsplash } from "../api/api";
import SearchIcon from "@mui/icons-material/Search";
import { Box, Button, LinearProgress } from "@mui/material";
import { Masonry } from "@mui/lab";
import ImageModal from "../imagemodal/ImageModal";
const Unsplash = () => {
  const [getPhotos, setGetPhotos] = useState([]);
  const [nextPage, setNextPage] = useState(1);
  const [searchImg, setSearchImg] = useState("");
  const [querySearch, setQuerySearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  useEffect(() => {
    const queryToUse = querySearch || "office";
    fetchUnsplash(nextPage, queryToUse).then((res) => {
      setGetPhotos(res);
      console.log(res);
    });
  }, [nextPage, querySearch]);
  const increment = () => {
    setNextPage((prevNextPage) => prevNextPage + 1);
    window.scroll(0, 0);
  };
  const decrement = () => {
    setNextPage((prevNextPage) => Math.max(1, prevNextPage - 1));
  };
  const search = (e) => {
    e.preventDefault();
    setQuerySearch(searchImg);
    setNextPage(1);
  };
  const modalOpenHandler = (image) => {
    setSelectedImage(image);
    setModalOpen(true);
  };
  const modalCloseHandler = () => {
    setModalOpen(false);
    setSelectedImage(null);
  };
  return (
    <div className="bg-sky-50">
      <div className="pt-10">
        <h1 className="font-customOne italic text-4xl font-black text-center">
          Free Images For Every Purpose
        </h1>
      </div>
      <div className="w-10/12 justify-self-center my-5">
        <form className="flex justify-center items-center" onSubmit={search}>
          <input
            type="text"
            placeholder="Search Images"
            onChange={(e) => {
              setSearchImg(e.target.value);
            }}
            className="lg:w-6/12 md:w-8/12 bg-white shadow-md pl-5 py-2 w-full"
          />
          <button
            type="submit"
            className="hover:bg-gray-400 active:bg-gray-500 bg-gray-300 shadow-md px-5 p-2"
          >
            <SearchIcon />
          </button>
        </form>
      </div>
      <div>
        {getPhotos.length > 0 ? (
          <div className="w-10/12 justify-self-center">
            <Masonry columns={{ sm: 1, md: 2, lg: 3 }} spacing={{ sm: 3 }}>
              {getPhotos.map((val) => (
                <Box key={val.id}>
                  <div className="bg-white rounded-md shadow-lg shadow-gray-400 my-2 p-5">
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <img
                        src={val.urls.small}
                        alt={val.alt_description}
                        className="w-full"
                        onClick={() => modalOpenHandler(val)}
                      />
                    </Box>
                    <div className="flex justify-between my-2">
                      <p className="font-medium font-customTwo">
                        {val.likes} Likes
                      </p>
                      <p className="flex gap-2">
                        {<span className="font-medium">Posted By:</span>}
                        {val.user.first_name} {val.user.last_name}
                      </p>
                    </div>
                    <Button
                      component="a"
                      href={val.links.download}
                      variant="contained"
                      target="_blank"
                      sx={{ width: "100%" }}
                    >
                      Download
                    </Button>
                  </div>
                </Box>
              ))}
            </Masonry>
          </div>
        ) : (
          <div className="w-10/12 justify-self-center my-10">
            <LinearProgress />
          </div>
        )}
      </div>
      <div className="w-10/12 flex justify-between justify-self-center py-5">
        <Button variant="contained" onClick={decrement}>
          Previous
        </Button>
        <Button variant="contained" onClick={increment}>
          Next
        </Button>
      </div>
      <ImageModal
        open={modalOpen}
        handleClose={modalCloseHandler}
        image={selectedImage}
      />
    </div>
  );
};

export default Unsplash;
