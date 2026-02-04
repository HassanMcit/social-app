import { Button } from "@heroui/react";
import { Link } from "react-router";

export default function AppButton({children,...props}) {
    
  return (
    <Button {...props}>
            {children}
          </Button>
  )
}
