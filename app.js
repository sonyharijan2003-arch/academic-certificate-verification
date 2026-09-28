async function verifyCertificate() {

    const certId = document.getElementById("certId").value;
    const result = document.getElementById("result");

    if (!certId) {
        result.innerHTML =
            "<p>⚠️ Please enter Certificate ID.</p>";
        return;
    }

    try {

        const response = await fetch(
            `https://divorcee-lumping-flap.ngrok-free.dev/verify/${certId}`
        );

        const data = await response.json();

        if (!response.ok || !data.success) {

            result.innerHTML =
                "<p>❌ Certificate not found.</p>";

            return;
        }

        const certificate = data.certificate;

        result.innerHTML = `
            <div class="success">

                <h3>✅ Certificate Verified</h3>

                <p>
                    <strong>Certificate ID:</strong>
                    ${certId}
                </p>

                <p>
                    <strong>Student Name:</strong>
                    ${certificate.studentName}
                </p>

                <p>
                    <strong>Course:</strong>
                    ${certificate.course}
                </p>

                <p>
                    <strong>Issue Date:</strong>
                    ${certificate.issueDate}
                </p>

            </div>
        `;

    } catch (error) {

        console.error(error);

        result.innerHTML = `
            <p>
                ❌ Backend server is not connected.
                Please make sure the backend is running.
            </p>
        `;
    }
}
