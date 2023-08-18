import Select from "react-select";
import useCountries from "../hooks/useCountries";

export type CountrySelectValue = {
  flag: string;
  label: string;
  latlng: number[];
  region: string;
  value: string;
}

interface CountrySelectProps {
   value?: CountrySelectValue,
   onChange: (value: CountrySelectValue) => void;
}


const CountrySelect: React.FC<CountrySelectProps> = ({
   value,
   onChange
}) => {
  const { getAll } = useCountries();

  return (
    <Select
         placeholder= "Anywhere"
         options= {getAll()}
         isClearable
         value= {value}
         onChange={(value) => onChange(value as CountrySelectValue)}
         formatOptionLabel= {(option) => (
          <div className="flex items-center gap-2">
              <span>{option.flag}</span>
              <p>
                 {option.label}
                 <span className="font-sm text-neutral-400 ml-1">
                   {option.region}
                 </span>
              </p>
          </div>
         )}
         classNames={{
            control: () => 'p-3 border-2',
         }}
         theme={ (theme) => ({
           ...theme,
           borderRadius:6,
           colors: {
              ...theme.colors,
              primary: "black",
              primary25: "#ffe4e6"
           }
           })
         }
     />
      
  )
}

export default CountrySelect
