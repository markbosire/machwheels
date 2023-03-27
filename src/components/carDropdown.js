import carsData from "../data.json";
import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";

import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
} from "@mui/material";
import { Menu, CarRepairOutlined } from "@mui/icons-material";
import uniqueBy from "lodash/uniqBy";

const StyledFormControl = styled(FormControl)(({ theme }) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    display: "flex",
    alignItems: "center",
  },
  select: {
    marginLeft: theme.spacing(1),
    flex: 1,
    minWidth: 120,
  },
  inputLabel: {
    marginLeft: theme.spacing(1),
  },
}));

const CarDropdown = () => {
  const [carType, setCarType] = useState("");

  const handleChange = (event) => {
    setCarType(event.target.value);
  };
  const uniqueCarTypes = uniqueBy(carsData.cars, "car_type");

  return (
    <div>
      <FormControl sx={{ width: "50%" }}>
        <IconButton>
          <Menu />
        </IconButton>
        <Box m="auto">
          <InputLabel
            id="car-type-label"
            sx={{
              textAlign: "center",
            }}
          >
            Car Type
          </InputLabel>
        </Box>
        <Select
          sx={{ minWidth: 200 }}
          labelId="car-type-label"
          id="car-type"
          value={carType}
          onChange={handleChange}
        >
          {uniqueCarTypes.map((car, index) => (
            <MenuItem key={index} value={car.car_type}>
              {car.car_type}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default CarDropdown;
