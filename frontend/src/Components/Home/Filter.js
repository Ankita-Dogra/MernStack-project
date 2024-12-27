import React, { useEffect, useState } from "react";
import FilterModal from "./FilterModal";
import { useDispatch } from "react-redux";
import { getAllProperties } from "../../Store/Property/property-action";
import { propertyAction } from "../../Store/Property/property-slice";

const Filter = () => {
  // state for controlling modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);
  //state for storing seleted filters
  const [selectedFilters, setSelectedFilters] = useState({});
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(propertyAction.updateSearchParams(selectedFilters));
    dispatch(getAllProperties());
  }, [selectedFilters, dispatch]);
  //function to handle opening the madal window
  const handleOpenModal = () => {
    setIsModalOpen(true); // sets isModelOpen to true to open the modal
  };
  const handleCloseModal = () => {
    setIsModalOpen(false); // sets isModalOpen to false to close the modal
  };
  //function to handle changes in filter
  const handleFilterChange = (filterName, value) => {
    //update the selected filters with the new values
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: value,
    }));
  };
  return (
    <>
      {/* click event to open the modal */}
      <span class="material-symbols-outlined filter" onClick={handleOpenModal}>
        tune
      </span>
      {isModalOpen && (
        <FilterModal
          selectedFilters={selectedFilters}
          onFilterChange={handleFilterChange}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};

export default Filter;
