import { Button, Container, Text, Title } from "@mantine/core";
import { useTranslation } from "react-i18next";

const ForbiddenScreen = () => {
  const { t } = useTranslation();
  return (
    <Container size="sm" style={{ textAlign: 'center' }}>
      <Title order={1} m={2}>
        EcoFarm rất tiếc 🚫
      </Title>
      <Text style={{ marginBottom: 20 }}>
        {/* {t('access-denied.description', { ns: 'error' })} */}
        Bạn không có quyền truy cập vào trang này
      </Text>
      <Button component="a" href="/" fullWidth>
        Trở về trang chủ
      </Button>
    </Container>
  )
}

export default ForbiddenScreen;