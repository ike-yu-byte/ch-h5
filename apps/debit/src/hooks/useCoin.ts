import { ref } from 'vue'
import { useCoinStore } from '@/store/modules/coin'

const mockData = [
  {
    Id: 'M716wsg8Q0eMmw-ksWkyjA',
    Code: 'USD',
    Rate: 1,
    Sign: '$',
    Precision: 2,
  },
  {
    Id: 'IRRrehXkSGhrclmeFkdA',
    Code: 'IRR',
    Rate: 0,
    Sign: ' تومان',
    Precision: 2,
  },
]
export function useCoin() {
  // 折算货币列表和当前选中的折算货币要调用接口查
  const coinList = ref<Array<any>>([])
  const currentCoin = ref<string>('')
  const { setCurrentCoin } = useCoinStore()
  setCurrentCoin(currentCoin.value)

  const getCoinData = () => {
    // 这里的mockData在真实情况下要换成调用接口获取的数据
    coinList.value = mockData.map((item: any) => ({
      label: item.Code,
      value: item.Code,
    }))
  }

  const setNewCoin = (item: any) => {
    console.log('选中的coin', item.value)
    currentCoin.value = item.value
    // 存入pinia，方便其它地方共享，避免反复调用接口
    setCurrentCoin(item.value)
  }
  return {
    coinList,
    getCoinData,
    currentCoin,
    setNewCoin,
  }
}
