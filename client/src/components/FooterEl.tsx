export default function FooterEl() {
    return (
        <footer className="footer">
            <a
                href="https://github.com/PotatoDoge1/Project-Two-Group-1"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-dark mb-2 mx-2"
                style={{ flex: '1 1 150px' }} // Flex properties for responsive behavior
            >
                <i className="bi bi-github"></i> GitHub
            </a>
        </footer>
    )
}