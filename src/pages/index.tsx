'use client'

import {
  Box,
  Flex,
  Text,
  HStack,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
} from '@chakra-ui/react'
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from '@chakra-ui/icons'
import { Image } from "@chakra-ui/react"

export default function WithSubnavigation() {
  const { isOpen, onToggle } = useDisclosure()

  return (
    <nav>
      <Flex
        bg={'#000000'}
        color={'white'}
        minH={'100px'}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        w="100%"
        borderStyle={'solid'}
        borderColor={'#000000'}
        align={'center'}>
        <Flex
          flex={{ base: 1, md: 'auto' }}
          ml={{ base: -2 }}
          w="100%"
          display={{ base: 'flex', md: 'none' }}>
          <IconButton
            onClick={onToggle}
            icon={isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />}
            variant={'ghost'}
            aria-label={'Toggle Navigation'}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }} w="100%">
        <Image src="https://www.rumorguard.org/images/nlp-logo.svg" alt="" />
        <Image src="https://www.rumorguard.org/images/rumorguard-logo.svg" alt="" height="50px" ml= {5}/>
          <Flex display={{ base: 'none', md: 'flex' }} ml={10} w="100%">
            <DesktopNav />
          </Flex>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={'flex-end'}
          direction={'row'}
          spacing={6}>
          <Icon
            viewBox="0 0 24 24"
            w={6}
            h={6}
            color="white"
            _hover={{ color: '#00E5BA' }}
          >
            <path
              fill="currentColor"
              d="M10 18a7.952 7.952 0 0 0 4.897-1.688l4.396 4.396 1.414-1.414-4.396-4.396A7.952 7.952 0 0 0 18 10c0-4.411-3.589-8-8-8s-8 3.589-8 8 3.589 8 8 8zm0-14c3.309 0 6 2.691 6 6s-2.691 6-6 6-6-2.691-6-6 2.691-6 6-6z"
            />
          </Icon>
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </nav>
  )
}

const DesktopNav = () => {
  const linkColor = useColorModeValue('gray.600', 'gray.200')
  const linkHoverColor = useColorModeValue('gray.800', 'white')
  // const popoverContentBgColor = useColorModeValue('white', 'gray.800')

  return (
    <HStack w="100%" justify="space-evenly">
      <HStack w="60%" justify="space-evenly">
        {NAV_ITEMS.map((navItem) => (
          <Box key={navItem.labelBottom}>
                  <Box>  
                    <Box
                    as="a"
                    w="100%"
                    href={navItem.href ?? '#'}
                    color={'white'}
                    _hover={{
                      textDecoration: 'none',
                      color: '#00E5BA',
                    }}> 
                      <Box p={0} m={0} lineHeight="1.1">
                        <Text p={0} m={0} as="span" fontSize="xl">{navItem.labelTop}</Text><br/>
                        <Text p={0} m={0} as="span" fontSize="2xl" fontWeight="bold">{navItem.labelBottom}</Text>
                      </Box>
                    </Box>
                </Box>
          </Box>
        ))}
      </HStack>
    </HStack>
  )
}

/* const DesktopSubNav = ({ labelTop, href }: NavItem) => {
  return (
    <Box
      as="a"
      href={href}
      role={'group'}
      display={'block'}
      p={2}
      rounded={'md'}
      _hover={{ bg: useColorModeValue('pink.50', 'gray.900') }}>
         <div>
      <StyledButton>Click Me</StyledButton>
      
    </div>
      <Stack direction={'row'} align={'center'}>
        <Box>
          <Text
            transition={'all .3s ease'}
            _groupHover={{ color: 'pink.400' }}
            fontWeight={500}>
            {labelTop}
          </Text>
        </Box>
        <Flex
          transition={'all .3s ease'}
          transform={'translateX(-10px)'}
          opacity={0}
          _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
          justify={'flex-end'}
          align={'center'}
          flex={1}>
          <Icon color={'pink.400'} w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </Box>
  )
} */

const MobileNav = () => {
  return (
    <Stack bg={useColorModeValue('white', 'gray.800')} p={4} display={{ md: 'none' }}>
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.labelBottom} {...navItem} />
      ))}
    </Stack>
  )
}

const MobileNavItem = ({ labelTop }: NavItem) => {
  const { isOpen, onToggle } = useDisclosure()

  return (
    <Stack spacing={4} onClick={onToggle}>
      <Box
        py={2}
        as="a"
        // href={'#'}
        justifyContent="space-between"
        alignItems="center"
        _hover={{
          textDecoration: 'none',
        }}>
        <Text fontWeight={600} color={useColorModeValue('gray.600', 'gray.200')}>
          {labelTop}
        </Text>
        {(
          <Icon
            as={ChevronDownIcon}
            transition={'all .25s ease-in-out'}
            transform={isOpen ? 'rotate(180deg)' : ''}
            w={6}
            h={6}
          />
        )}
      </Box>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={'solid'}
          borderColor={useColorModeValue('gray.200', 'gray.700')}
          align={'start'}>
        </Stack>
      </Collapse>
    </Stack>
  )
}

interface NavItem {
  labelTop: string
  labelBottom: string
  href?: string
}

const NAV_ITEMS: Array<NavItem> = [
  {
    labelTop: 'Recent',
    labelBottom: 'Checks',
    // href: '#',
  },
  {
    labelTop: 'The',
    labelBottom: 'Factors'
    // href: '#',
  },
  {
    labelTop: 'The',
    labelBottom: 'Topics'
    // href: '#',
  },
  {
    labelTop: 'Take',
    labelBottom: 'Action'
    // href: '#',
  },
]