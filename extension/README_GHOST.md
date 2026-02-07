# HiddenApply Ghost 👻 - User Manual

## 1. Setup
1. Open the Side Panel.
2. Go to **Settings**.
3. **Personal Info**:
   - **Your Name**: Used for Name fields.
   - **Current Salary**: Used for CTC/Salary expectations (e.g., "15,00,000").
4. **API Key**: Enter your Gemini API Key.
5. **Resume**: Paste your plain text resume.
5. **Resume URL** (Optional):
   - **IMPORTANT**: This must be a **Direct Download Link** to a PDF.
   - Example: `https://mysite.com/resume.pdf`
   - ❌ Do NOT use Google Drive Viewer links (e.g., `drive.google.com/file/...`).
   - ✅ Use a raw link (e.g., from GitHub, S3, or your portfolio).

## 2. Capabilities
### ✅ Supported Platforms
- **Greenhouse**: 100% Support.
- **Lever**: 90% Support (Sourcing questions vary).
- **Google Forms**: 95% Support (Matches Question Headers).
- **Ashby**: Beta Support.

### 🧠 AI Logic
- **Smart Text**: Keep answers short ("Yes" instead of "I have 5 years...").
- **Cover Letter**: Auto-generates from your Resume Summary + Key Achievements.
- **Salaries**: Auto-estimates market standard integers (e.g., "1200000") if you don't specify.

## 3. Known Limitations
- **Google Forms File Upload**: Due to security sandboxing, Ghost **cannot** upload files to Google Forms. You must click "Add File" manually.
- **Complex Radios**: Some custom-styled radio buttons (non-standard HTML) may be missed. Ghost defaults to "LinkedIn" for sourcing questions where possible.

## 4. Troubleshooting
- **"Content Script Error"**: Reload the page.
- **"AI Error"**: Check your API Key quota.
- **"Resume Not Uploading"**: Check if your URL is direct PDF.
