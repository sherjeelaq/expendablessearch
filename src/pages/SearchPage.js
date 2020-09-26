import React, { useState, useEffect } from "react";
import "./SearchPage.css";
import { useStateValue } from "../StateProvider";
import { API_KEY, CONTEXT_KEY, GRAPH_API_KEY } from "../keys";
import axios from "axios";
import KnowledgePanel from "../components/KnowledgePanel";
import { Link } from "react-router-dom";
import Search from "../components/Search";
import SearchIcon from "@material-ui/icons/Search";
import DescriptionIcon from "@material-ui/icons/Description";
import ImageIcon from "@material-ui/icons/Image";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import RoomIcon from "@material-ui/icons/Room";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { useHistory } from "react-router-dom";
import Pagination from "react-js-pagination";

function SearchPage() {
  const [{ term }, dispatch] = useStateValue();
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState();
  const [knowledgeGraphResults, setKnowledgeGraphResults] = useState();
  const [showKGR, setShowKGR] = useState(true);
  const [images, setImages] = useState();
  const itemsPerPage = 10;
  const totalItems = 100;
  // const { datta } = useGoogleSearch(term, currentPage); //Live api call
  const history = useHistory();

  if (term === null || term === "") {
    history.push("/");
  }

  // useEffect(() => {
  //   setData(response.firstpage);

  // }, []);

  useEffect(() => {
    const fetchData = async (term, pageNumber) => {
      const request = await axios.get(
        `https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${CONTEXT_KEY}&q=${term}&start=${
          (pageNumber - 1) * 10 + 1
        }`
      );
      setData(request.data);
      // setData(request.data.results);
      return request;
    };

    fetchData(term, currentPage);

    const imageFunc = async (totalItems, itemsPerPage, currentPage) => {
      const results = await imgFor(totalItems, itemsPerPage, currentPage);
      setImages(results);
    };
    imageFunc(totalItems, itemsPerPage, currentPage);
  }, [currentPage]);

  useEffect(() => {
    const fetchData = async (term, pageNumber) => {
      const request = await axios.get(
        `https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${CONTEXT_KEY}&q=${term}&start=${
          (pageNumber - 1) * 10 + 1
        }`
      );
      setData(request.data);
      // setData(request.data.results);
      return request;
    };
    fetchData(term, currentPage);

    const knowledgeGraphFunction = async (term, currentPage) => {
      if (currentPage === 1) {
        setShowKGR(true);
        const request = await axios.get(
          `https://kgsearch.googleapis.com/v1/entities:search?query=${term}&key=${GRAPH_API_KEY}&limit=2&indent=True`
        );
        // setData(request.data.results);

        if (request.data.itemListElement.length > 0) {
          for (var i = 0; i < request.data.itemListElement.length; i++) {
            var someDetails = false;
            if (
              request.data.itemListElement[i].result.hasOwnProperty("image") &&
              request.data.itemListElement[i].result.hasOwnProperty(
                "detailedDescription"
              )
            ) {
              setKnowledgeGraphResults(request.data.itemListElement[i].result);
              break;
            } else if (
              request.data.itemListElement[i].result.hasOwnProperty("image")
            ) {
              someDetails = true;
              setKnowledgeGraphResults(request.data.itemListElement[i].result);
            } else if (
              request.data.itemListElement[i].result.hasOwnProperty(
                "detailedDescription"
              )``
            ) {
              someDetails = true;
              setKnowledgeGraphResults(request.data.itemListElement[i].result);
            }

            if (i + 1 == request.data.itemListElement.length && !someDetails) {
              setKnowledgeGraphResults(request.data.itemListElement[0].result);
            }
          }
        } else {
          setShowKGR(false);
        }

        return request;
      } else {
        setShowKGR(false);
      }
    };

    knowledgeGraphFunction(term, currentPage);
  }, [term]);

  function imgFor(totalItems, itemsPerPage, currentPage) {
    let paginationImgItems = [];
    for (var i = 1; i <= totalItems / itemsPerPage; i++) {
      if (i === currentPage) {
        paginationImgItems.push(
          <img
            key={i}
            src="https://i.imgur.com/dhCYjPu.png"
            className="searchPage__paginationItem"
            alt=""
          />
        );
      } else {
        paginationImgItems.push(
          <img
            key={i}
            src="https://i.imgur.com/4KSiNBA.png"
            className="searchPage__paginationItem"
            alt=""
          />
        );
      }
    }
    return paginationImgItems;
  }

  const handlePageChange = (pageNumber) => {
    if (pageNumber > 1) {
      setShowKGR(false);
    } else {
      setShowKGR(true);
    }
    setCurrentPage(pageNumber);
    window.window.scrollTo(0, 0);
  };

  return (
    <div className="searchPage">
      <div className="searchPage__header">
        <Link to="/">
          <img
            className="searchPage__logo"
            src="https://i.imgur.com/5fps5yz.png"
            alt=""
          />
        </Link>

        <div className="searchPage__headerBody">
          <Search hideButtons />

          <div className="searchPage__options">
            <div className="searchPage__optionsLeft">
              <div className="searchPage__option">
                <SearchIcon fontSize="small" />
                <Link to="/all">All</Link>
              </div>
              <div className="searchPage__option">
                <ImageIcon fontSize="small" />
                <Link to="/images">Images</Link>
              </div>
              <div className="searchPage__option">
                <DescriptionIcon fontSize="small" />
                <Link to="/news">News</Link>
              </div>

              <div className="searchPage__option">
                <LocalOfferIcon fontSize="small" />
                <Link to="/shopping">Shopping</Link>
              </div>
              <div className="searchPage__option">
                <RoomIcon fontSize="small" />
                <Link to="/maps">Maps</Link>
              </div>
              <div className="searchPage__option">
                <MoreVertIcon fontSize="small" />
                <Link to="/more">More</Link>
              </div>
            </div>
            <div className="searchPage__optionsRight">
              <div className="searchPage__option">
                <Link to="/settings">Settings</Link>
              </div>
              <div className="searchPage__option">
                <Link to="/tools">Tools</Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="searchPage__container">
        {data && (
          <div className="searchPage__results">
            <p className="searchPage__resultCount">
              About {data?.searchInformation.formattedTotalResults} results (
              {data?.searchInformation.formattedSearchTime} seconds) for {term}
            </p>
            <h2 className="searchPage__resultQuery">
              Showing results for <a href="#">{term}</a>
            </h2>
            {data?.items.map((item) => (
              <div key={item?.cacheId} className="searchPage__result">
                <a className="searchPage__resultLink" href={item.link}>
                  {item.pagemap?.cse_image?.length > 0 &&
                    item.pagemap?.cse_image[0]?.src && (
                      <img
                        src={
                          item.pagemap?.cse_image?.length > 0 &&
                          item.pagemap?.cse_image[0]?.src
                        }
                        alt={item.title}
                        className="searchPage__resultImage"
                      />
                    )}
                  {item.displayLink} ▼
                </a>
                <a className="searchPage__resultTitle" href={item.link}>
                  <h2>{item.title}</h2>
                </a>
                <p className="searchPage__resultSnippit">{item.snippet}</p>
              </div>
            ))}
          </div>
        )}

        <div className="searchPage__knowledgePanel">
          {showKGR ? (
            <KnowledgePanel knowledgeGraphResults={knowledgeGraphResults} />
          ) : (
            ""
          )}
        </div>
      </div>

      <div className="searchPage__googlePagination">
        <div className="searchPage__paginationImages">
          <img
            src="https://i.imgur.com/yy2hyzb.png"
            className="searchPage__paginationIItem"
          />
          {images}
          <img
            src="https://i.imgur.com/yJa1pxc.png"
            className="searchPage__paginationLItem"
          />
        </div>
        <Pagination
          activePage={currentPage}
          itemsCountPerPage={itemsPerPage}
          totalItemsCount={totalItems}
          onChange={handlePageChange.bind(this)}
          innerClass="searchPage__pagination"
          activeClass="searchPage__activePage"
          itemClass="searchPage__itemPage"
          pageRangeDisplayed={10}
        />
      </div>
    </div>
  );
}

export default SearchPage;
