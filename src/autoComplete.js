import React from "react";
// import { makeStyles } from "@material-ui/core/styles";
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
    value: "3142003040",
    label: "314-200-3040"
  },
  {
    value: "2018589645",
    label: "201-858-9645"
  },
  {
    value: "9467378109",
    label: "946-737-8109"
  },
  {
    value: "8596259975",
    label: "859-625-9975"
  }
];

// const useStyles = makeStyles((theme) => ({
//   root: {
//     "& .MuiTextField-root": {
//       margin: theme.spacing(1),
//       width: "25ch"
//     }
//   }
// }));

// function formatPhoneNumber(phoneNumberString) {
//   var cleaned = ("" + phoneNumberString).replace(/\D/g, "");
//   var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
//   if (match) {
//     return "(" + match[1] + ") " + match[2] + "-" + match[3];
//   }
//   return null;
// }

export default function AutoComplete() {
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

  // const formattedValue = formatPhoneNumber(currency);
  return (
    <div style={{ padding: "4em" }}>
      <TextField
        ref={inputRef}
        id="standard-select-currency"
        label="Primary Phone"
        value={currency}
        onChange={handleChange}
        variant="outlined"
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
