import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Popper from "@material-ui/core/Popper";
import Fade from "@material-ui/core/Fade";
import Paper from "@material-ui/core/Paper";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";

const currencies = [
  {
    value: "USD",
    label: "$ - US Dollar"
  },
  {
    value: "EUR",
    label: "€ - Euro"
  },
  {
    value: "BTC",
    label: "฿ - Bitcoin"
  },
  {
    value: "JPY",
    label: "¥ - Japanese Yen"
  }
];

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch"
    }
  }
}));

export default function MultilineTextFields() {
  // const classes = useStyles();
  const [currency, setCurrency] = React.useState(() => currencies[0].value);
  const [showOptions, setShowOptions] = React.useState(false);
  const [options, setOptions] = React.useState(() => currencies);
  const inputRef = React.useRef(null);
  const handleChange = (event) => {
    event.preventDefault();
    const value = event.target.value;
    const filteredOptions = getFilteredOptions(value);
    if (filteredOptions.length > 0 && value.trim() !== "") {
      setOptions(() => filteredOptions);
      setShowOptions(() => true);
      setCurrency(event.target.value);
    } else if (filteredOptions.length === 0 && value.trim() !== "") {
      setShowOptions(() => false);
      setOptions(() => currencies);
      setCurrency(event.target.value);
    } else if (filteredOptions.length >= 0 && value.trim() === "") {
      setShowOptions(() => true);
      setOptions(() => currencies);
      setCurrency(event.target.value);
    } else {
      setShowOptions(() => false);
      setCurrency(event.target.value);
    }
  };

  const getFilteredOptions = (value) =>
    currencies.filter((option) => option.value.trim().includes(value.trim()));

  const handleToggle = () => {
    setShowOptions((prevOpen) => !prevOpen);
  };

  const handleClickAway = (event) => {
    if (inputRef.current && inputRef.current.contains(event.target)) {
      return;
    }
    setShowOptions(false);
  };

  const handleMenuItemClick = (event, index) => {
    setCurrency(() => options[index].value);
    setShowOptions(false);
  };
  return (
    <div style={{ padding: "4em" }}>
      <TextField
        ref={inputRef}
        id="standard-select-currency"
        label="Select"
        value={currency}
        onChange={handleChange}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleToggle}
              >
                <ArrowDropDownIcon />
              </IconButton>
            </InputAdornment>
          )
        }}
      />
      <Popper
        open={showOptions}
        anchorEl={inputRef.current}
        placement="bottom-start"
        transition
      >
        {({ TransitionProps }) => (
          <ClickAwayListener onClickAway={handleClickAway}>
            <Fade {...TransitionProps} timeout={350}>
              <Paper>
                {options.map((option, index) => (
                  <MenuItem
                    key={option.value}
                    value={option.value}
                    onClick={(event) => handleMenuItemClick(event, index)}
                  >
                    {option.label}
                  </MenuItem>
                ))}
              </Paper>
            </Fade>
          </ClickAwayListener>
        )}
      </Popper>
    </div>
  );
}
