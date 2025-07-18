import { RevalidateOneHour } from '@/lib/constants';

import ExploreList from '../../ExploreList';

export const revalidate = RevalidateOneHour * 6;

export default function page({ params }: { params: { pageNum: string | undefined; locale: string } }) {
  return <ExploreList pageNum={params.pageNum} locale={params.locale} />;
}
