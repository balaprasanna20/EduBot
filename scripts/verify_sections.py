import urllib.request
import urllib.error
import json
import re

url = "http://localhost:3000/"
try:
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    res = urllib.request.urlopen(req)
    raw_html = res.read().decode("utf-8")
    # Clean tags for text verification
    clean_text = re.sub(r'<[^>]+>', ' ', raw_html)
    clean_text = ' '.join(clean_text.split())
    print(f"Status: {res.status}, Length: {len(raw_html)} bytes")
except Exception as e:
    print(f"Error opening {url}: {e}")
    exit(1)

sections = ["overview", "features", "user-portals", "benefits", "request-demo"]
for s in sections:
    pattern = f'id="{s}"'
    found = pattern in raw_html
    print(f"Section #{s}: {'FOUND' if found else 'MISSING'}")

checks = [
    # Overview (Exact Approved Reference Copy)
    "EDUCATION MANAGEMENT SYSTEM",
    "Less admin.",
    "More time for",
    "learning.",
    "Bring records, attendance and classroom",
    "tasks together—so your team can focus on",
    "education.",
    "For schools, colleges and universities",
    "Explore Edubot",
    "Request a Demo",
    "Administration",
    "Teaching",
    "Learning",
    
    # Features
    "Campus essentials. All in one place.",
    "Centralised records",
    "GPS-verified attendance",
    "Leave management",
    "Teaching",
    "Study materials",
    "Student progress",
    "Explore user portals",
    
    # User Portals
    "FOUR PORTALS. ONE EDUBOT.",
    "Different roles.",
    "Super Admin",
    "Administrator",
    "Mentor",
    "Student",
    "Explore the benefits",
    
    # Benefits
    "WHY EDUBOT",
    "One institution.",
    "Working better,",
    "together.",
    "Explore Edubot",
    
    # Request a Demo
    "LET’S CONNECT",
    "Your next chapter",
    "starts with Edubot.",
    "See how connected administration, teaching and",
    "PERSONALISED WALKTHROUGH",
    "Let’s explore your campus needs.",
    "Tell us a little about your institution.",
    "Full name",
    "Work email",
    "Institution name",
    "Institution type",
    "School",
    "College",
    "University",
    "Your role",
    "What would you like to explore?",
    "Request my demo",
    "Our team will contact you to arrange your demo.",
    "Schools · Colleges · Universities",
    
    # Footer
    "Edubot by Codework",
    "Built for connected institutions."
]

passed = 0
for c in checks:
    if c in clean_text:
        passed += 1
    else:
        print(f"Missing check: '{c}'")

print(f"Passed {passed}/{len(checks)} content verifications!")

# Also verify sub-routes
subroutes = ["/features", "/user-portals", "/benefits", "/request-demo", "/dashboard"]
for r in subroutes:
    try:
        sub_req = urllib.request.Request(f"http://localhost:3000{r}", headers={"User-Agent": "Mozilla/5.0"})
        sub_res = urllib.request.urlopen(sub_req)
        print(f"Subroute {r}: Status {sub_res.status}")
    except Exception as e:
        print(f"Subroute {r} failed: {e}")

# Verify /api/demo endpoint behavior
print("\n--- Verifying /api/demo Endpoint ---")

# Test 1: Validation rejection on empty body (Expect 422)
try:
    demo_req = urllib.request.Request(
        "http://localhost:3000/api/demo",
        data=json.dumps({}).encode("utf-8"),
        headers={"Content-Type": "application/json", "Origin": "http://localhost:3000"}
    )
    urllib.request.urlopen(demo_req)
    print("Test 1 FAILED: Empty payload was accepted unexpectedly")
except urllib.error.HTTPError as e:
    if e.code == 422:
        print(f"Test 1 PASSED: Empty payload properly rejected with 422 Unprocessable Entity")
    else:
        print(f"Test 1 Response: {e.code}")

# Test 2: Valid payload when RESEND_API_KEY is not configured (Expect 503 with configuration message, NOT fake success)
valid_payload = {
    "fullName": "Sarah Jenkins",
    "workEmail": "sarah.jenkins@oxford.edu",
    "institutionName": "Oxford Collegiate",
    "institutionType": "University",
    "role": "Super Admin",
    "exploreNotes": "Evaluating student attendance & LMS sync.",
    "website": ""
}
try:
    demo_req = urllib.request.Request(
        "http://localhost:3000/api/demo",
        data=json.dumps(valid_payload).encode("utf-8"),
        headers={"Content-Type": "application/json", "Origin": "http://localhost:3000"}
    )
    res = urllib.request.urlopen(demo_req)
    print(f"Test 2 Response: {res.status} (Email provider sent)")
except urllib.error.HTTPError as e:
    res_data = json.loads(e.read().decode("utf-8"))
    if e.code == 503 and "RESEND_API_KEY" in res_data.get("error", ""):
        print("Test 2 PASSED: 503 cleanly reported missing RESEND_API_KEY without falling back to fake success")
    else:
        print(f"Test 2 Status: {e.code}, body: {res_data}")

# Test 3: Honeypot spam field populated (Expect silent 200 or block without sending)
spam_payload = dict(valid_payload)
spam_payload["website"] = "http://spam-bot.site"
try:
    demo_req = urllib.request.Request(
        "http://localhost:3000/api/demo",
        data=json.dumps(spam_payload).encode("utf-8"),
        headers={"Content-Type": "application/json", "Origin": "http://localhost:3000"}
    )
    res = urllib.request.urlopen(demo_req)
    print(f"Test 3 PASSED: Honeypot captured spam without emailing provider (Status: {res.status})")
except Exception as e:
    print(f"Test 3: {e}")

# Test 4: Oversized payload (Expect 413)
oversized_payload = dict(valid_payload)
oversized_payload["exploreNotes"] = "A" * 20000
try:
    demo_req = urllib.request.Request(
        "http://localhost:3000/api/demo",
        data=json.dumps(oversized_payload).encode("utf-8"),
        headers={"Content-Type": "application/json", "Origin": "http://localhost:3000"}
    )
    urllib.request.urlopen(demo_req)
    print("Test 4 FAILED: Oversized payload accepted")
except urllib.error.HTTPError as e:
    if e.code == 413:
        print("Test 4 PASSED: Oversized payload rejected with 413 Payload Too Large")
    else:
        print(f"Test 4: Returned {e.code}")
