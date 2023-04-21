import styles from '../styles/information.module.scss';

export default function Information() {
  return (
    <div className=''>
      <h1 className={`${styles.text} text-5xl lg:text-6xl font-semibold`}>Jeram.ai —</h1>
      <p className='mt-8 text-gray-300 text-4xl lg:text-5xl font-bold '>Nothing but amazing.</p>
    </div>
  );
}
