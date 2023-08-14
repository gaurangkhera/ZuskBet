import { Button } from "../ui/button"
import * as React from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"

interface BetDropDownProps {
    position: string;
    setPosition: React.Dispatch<React.SetStateAction<string>>;
  }
 
const BetDropDown:React.FC<BetDropDownProps> = ({ position, setPosition }) => {

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">{position.replace(position.charAt(0), position.charAt(0).toLocaleUpperCase())}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Select bet</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
          <DropdownMenuRadioItem value="Mark Zuckerberg">Zuckerberg</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="Elon Musk">Musk</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default BetDropDown