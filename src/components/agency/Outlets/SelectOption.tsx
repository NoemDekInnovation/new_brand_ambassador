import { FormControl } from "../../../ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../../ui/select";

interface GenderProps {
  field: any;
  defaultValue?: any;
}
export function StatesSelect({ field, defaultValue }: GenderProps) {
  const statesInNigeria = [
    "Abia",
    "Adamawa",
    "Akwa Ibom",
    "Anambra",
    "Bauchi",
    "Bayelsa",
    "Benue",
    "Borno",
    "Cross River",
    "Delta",
    "Ebonyi",
    "Edo",
    "Ekiti",
    "Enugu",
    "Gombe",
    "Imo",
    "Jigawa",
    "Kaduna",
    "Kano",
    "Katsina",
    "Kebbi",
    "Kogi",
    "Kwara",
    "Lagos",
    "Nasarawa",
    "Niger",
    "Ogun",
    "Ondo",
    "Osun",
    "Oyo",
    "Plateau",
    "Rivers",
    "Sokoto",
    "Taraba",
    "Yobe",
    "Zamfara",
    "FCT", // Federal Capital Territory (Abuja)
  ];

  return (
    <Select
      onValueChange={field.onChange}
      defaultValue={field.value || defaultValue}
    >
      <FormControl>
        <SelectTrigger className="w-full h-12">
          <SelectValue placeholder="Select State">
            {field.value || defaultValue || "Select State"}
          </SelectValue>
        </SelectTrigger>
      </FormControl>
      <SelectContent className="bg-white ">
        {statesInNigeria.map((item, i) => (
          <SelectItem className="" key={i} value={item}>
            {item}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export function OutletType({ field, defaultValue }: GenderProps) {
  const statesInNigeria = ["Supermarket", "Mall", "Open Market"];

  return (
    <Select
      onValueChange={field.onChange}
      defaultValue={field.value || defaultValue}
    >
      <FormControl>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select Outlet Type">
            {field.value || defaultValue || "Outlet Type *"}
          </SelectValue>
        </SelectTrigger>
      </FormControl>
      <SelectContent className="bg-white">
        {statesInNigeria.map((item, i) => (
          <SelectItem className="" key={i} value={item.toLocaleLowerCase()}>
            {item}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
