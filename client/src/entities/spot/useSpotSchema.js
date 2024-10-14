import { useQuery } from '@tanstack/react-query'
import { GET } from '@/shared/api'

export const useSpotSchema = () => {
	const {
		data: schema,
		isLoading: isSchemaLoading,
		isSuccess: isSchemaLoaded
	} = useQuery({
		queryKey: ['schemas', 'spots'],
		queryFn: () => GET('schemas/spots')
	})

	return { schema, isSchemaLoading, isSchemaLoaded }
}
