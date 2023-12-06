import { signOut } from '@/utils/helpers/AuthHelper'
import { Button, Navbar, NavbarContent, NavbarItem } from '@nextui-org/react'
import { BoxIcon, HomeIcon } from 'lucide-react'
import { type GetServerSideProps } from 'next'
import { useTranslation } from 'next-i18next'
import config from 'next-i18next.config.mjs'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Link from 'next/link'
import { useRouter } from 'next/router'

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'vi', ['common'], config)),
    },
  }
}

export default function HomepageScreen() {
  const { pathname } = useRouter()
  const { t } = useTranslation(['common'])
  const items = [
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
  ]
  return (
    <div>
      <Navbar>
        <NavbarContent className='hidden gap-4 sm:flex' justify='center'>
          {items.map((item) => (
            <NavbarItem key={item.id} isActive={pathname.includes(item.href)}>
              <Link color='foreground' href={item.href} className='uppercase'>
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
    </div>
  )
}
