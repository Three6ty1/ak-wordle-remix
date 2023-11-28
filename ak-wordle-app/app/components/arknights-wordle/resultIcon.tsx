export default function ResultIcon({ image, alt }: any) {
    return (
        <div>
            <img src={image} alt={alt} width={25} height={25} />
        </div>
    );
}