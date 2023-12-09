import Select from "react-select";

const customStyles = {
  control: (provided: any, state: { isFocused: any }) => ({
    ...provided,
    border: state.isFocused ? "2px solid blue" : "2px solid lightgray", // Border style on focus
    borderRadius: "8px",
    boxShadow: state.isFocused ? "0 0 0 1px blue" : "none", // Box shadow on focus
    "&:hover": {
      borderColor: "blue", // Border color on hover
    },
  }),
  menu: (provided: any) => ({
    ...provided,
    backgroundColor: "lightgray", // Background color of the dropdown menu
    zIndex: 9999,
  }),
  option: (provided: any, state: { isSelected: any }) => ({
    ...provided,
    backgroundColor: state.isSelected ? "blue-500" : "white", // Background color of selected option
    color: state.isSelected ? "white" : "black", // Text color of selected option
    "&:hover": {
      backgroundColor: "lightblue", // Background color of option on hover
    },
  }),
};

const SelectOption = ({
  className,
  placeholder,
  id,
  name,
  onChange,
  required,
  options,
  defaultValue,
  isDisabled,
}: {
  className: string;
  placeholder: string;
  id: string;
  name: string;
  onChange: any;
  required: boolean;
  options: { value: string; label: string }[];
  defaultValue: any;
  isDisabled: boolean;
}) => {
  return (
    <Select
      styles={customStyles}
      placeholder={placeholder}
      className={className}
      id={id}
      name={name}
      onChange={onChange}
      required={required}
      options={options}
      defaultValue={defaultValue}
      isDisabled={isDisabled}
    />
  );
};

export default SelectOption;
