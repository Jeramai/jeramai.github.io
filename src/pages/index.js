import Background from '@/components/Background'
import Information from '@/components/Information'
import J from '@/components/J'
import Logo from '@/components/Logo'


export default function Home() {
  return (
    <main className="h-screen lg:p-24">
      <div className='h-full flex flex-col items-center justify-between' style={{
        background: 'linear-gradient(to bottom, transparent, #2e094a) #051e32'
      }}>
        <Background />
        <Logo />

        <div className='flex content-evenly items-center justify-center h-full w-full flex-col lg:flex-row'>
          <div className='h-1/3 lg:w-1/2 lg:max-w-3xl  z-10 order-2 lg:order-1'>
            <Information />
          </div>
          <div className='w-full h-1/2 lg:h-full lg:w-1/2 order-1 lg:order-2'>
            <J />
          </div>
        </div>
      </div>
    </main >
  )
} 
