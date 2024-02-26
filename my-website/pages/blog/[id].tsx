//pages/blog/[id].tsx
import { useRouter } from 'next/router'
import Clock from '../../components/Clock';

export default function Blog() {
    const router = useRouter()
    const { id } = router.query
    return (
        <div>
            <h1>Blog: {id}</h1>
            <Clock />
        </div>
      );
}