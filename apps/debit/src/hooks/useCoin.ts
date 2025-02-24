import { ref } from 'vue'

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
  const coinList = ref<Array<any>>([])
  const currentCoin = ref<string>('')

  const getCoinData = () => {
    coinList.value = mockData.map((item: any) => ({
      label: item.Code,
      value: item.Code,
    }))
  }
  return {
    coinList,
    getCoinData,
    currentCoin,
  }
}
