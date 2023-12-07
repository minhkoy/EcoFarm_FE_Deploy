import { Button, Divider, Link, Navbar, NavbarContent, NavbarItem } from "@nextui-org/react"
import { useRouter } from "next/router"
import { useTranslation } from "next-i18next"
import { BoxIcon, HomeIcon, PackageIcon } from "lucide-react"
import { signOut } from "@/utils/helpers/AuthHelper"
import { useMemo } from "react"

const Header = () => {    
    const { pathname } = useRouter()
    const { t } = useTranslation(['common'])
    const items = useMemo(() =>[
      {
        id: 'homepage',
        label: t('homepage'),
        href: '/homepage',
        icon: <HomeIcon />,
      },
      {
        id: 'scenario',
        label: t('scenario'),
        href: '/scenario',
        icon: <BoxIcon />,
      },
      {
        id: 'packages',
        label: t('packages'),
        href: '/packages',
        icon: <PackageIcon />,
      }
    ], [t])
    return (
      <div className=" flex flex-col">
        <Navbar>
          <NavbarContent className='hidden gap-4 sm:flex' justify='center'>
            {items.map((item) => (
              <NavbarItem key={item.id} isActive={pathname.includes(item.href)}>
                <Link color='foreground' href={item.href} className='uppercase text-primary'>
                  {item.icon}
                  {item.label}
                </Link>
              </NavbarItem>
            ))}
          </NavbarContent>
  
          <NavbarContent as='div' justify='end'>
            <NavbarItem>
              <Button onClick={() => signOut()} className='uppercase'>
                {t('log-out')}
              </Button>
            </NavbarItem>
          </NavbarContent>
        </Navbar>
        <Divider orientation="horizontal" className="my-4" />
      </div>
    )
}

export default Header