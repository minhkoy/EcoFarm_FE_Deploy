import { createPackageReview as createPackageReviewApi } from "@/config/apis/packageReviews";
import { ToastHelper } from "@/utils/helpers/ToastHelper";
import { useMutation } from "@tanstack/react-query";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

export default function useCreatePackageReview() {
    const router = useRouter();
    const { t } = useTranslation();
    return useMutation({
        mutationKey: ['createPackageReview'],
        mutationFn: createPackageReviewApi,
        onSuccess: ({ data }) => {
            if (data.isSuccess) {
              ToastHelper.success(
                t('success', { ns: 'common' }),
                t('success', { ns: 'farm-package-review'}),
              )
              void router.reload()
            } else {
              ToastHelper.error(
                t('default-error.title', { ns: 'error' }),
                data.message //data.errors.join('. '),
              )
            }
          },
    })
}