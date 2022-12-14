import React from 'react'

import { Button } from '@chakra-ui/react'

export default function ToggleColorButton ({ toggleColorMode }) {
    return <Button pos="absolute" right="2" top="2" onClick={() => toggleColorMode()}>
      •
    </Button>
  }