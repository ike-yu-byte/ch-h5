import Http from 'common-assets/utils/http.ts'
import { baseURL } from '@/config'
import { $t } from '@/i18n'
import { useMemberStore } from '@/store'
import { ElMessage } from 'element-plus'

const config = {
  timeout: 3000,
  baseURL,
}
export default new Http(config, useMemberStore, $t, ElMessage)
