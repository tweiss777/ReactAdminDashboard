export default function calculatePaginationOffset(pageNumber: number) {
    return (pageNumber - 1) * 10;
}
