import styles from './layout.module.css'

export default function Layout(params: { children: any }) {
  const children = params.children
  return (
    <div className={styles.container}>
      <main>{children}</main>
    </div>
  )
}
