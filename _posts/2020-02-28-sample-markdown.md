 
1.1 Initial Console Setup 

Perform these steps from the serial / VMware console before accessing the Web UI. 

 

1.1.1 Connect to the console 

Open your serial/VMware console so you can type commands directly on the device. 

1.1.2 Log in 

Username : Admin  

Password : Admin 

1.1.3 Enter enable mode 

A screenshot of a computer program

AI-generated content may be incorrect.en  

Password : Admin 

1.1.4 Enter the network configuration context 

configure network interface network-if 0 

1.1.5 Assign IP settings 

ip <IP_ADDRESS>  

gateway <GATEWAY_IP>  

prefix-length <PREFIX> 

1.1.6 Activate the configuration 

activate 

1.1.7 Verify the result 

display 

 

1.2 Web-UI Setup  

1.2.1 Temp-address your PC 

Set any free IP in 192.168.0.0/24 (e.g. 192.168.0.10). 

1.2.2 Open the factory Web-UI 

Browse to https://192.168.0.2 → log in with Admin / Admin. 

1.2.3 Navigate to the interface settings 

IP Network → Core Entities → IP Interfaces. 

1.2.4 Edit the management port 

Select o+m+c → enter New IP / Prefix Length / Gateway → Save. 

A screenshot of a computer

AI-generated content may be incorrect. 

1.2.5 Activate the change 

Click Activate / Apply (label varies). 

1.2.6 Move your PC to the new subnet 

Reconfigure your PC with an IP that matches the interface’s new network. 

1.2.7 Reconnect & verify 

Browse to https://<NEW_IP> → log in → confirm the interface shows Up with the new address. 

2. Network & Certificate 

2.1 Sign in to the Web UI 

Sign in to the Web UI (Username / Password: Admin / Admin). 

2.2 Change the IP Inerfaces 

Path: IP NETWORK → CORE ENTITIES → IP Interfaces 

A screenshot of a computer

AI-generated content may be incorrect.If only one interface exists, add DNS to it.  

If two + interfaces are needed, create an additional interface. 

 

 

2.3 NAT Translation (optional) 

Path: IP NETWORK → CORE ENTITIES → NAT Translation – add rules if the SBC is behind NAT. 
A screenshot of a computer

AI-generated content may be incorrect. 

 

2.4 TLS Certificate 

A valid server certificate is required before binding the Teams SIP interface to TLS. 

A screenshot of a computer

AI-generated content may be incorrect.Step 1 – Open TLS ContextPath: Setup → TLS Contexts → Index 0 / Name default → Change Certificate ». 

 

 

 

 

 

 

 

Step 2 – Upload Key Pair & Certificate 

A screenshot of a computer

AI-generated content may be incorrect.(Optional) Enter private‑key pass‑phrase. 

Load Private Key File (.pem / .pfx) 

Load Device Certificate File (public PEM) 

 

 

3  SBC Core Configuration  

3.1  Media Realms 

UDP Port Start 

Max Media Session Legs 

IPv4 Interface* 

7000 

100 

Interface bound to SIP‑trunk network 

6000 

100 

Interface with public IP 

 

 

 

*Use actual interface names from IP Interfaces. 

A screenshot of a computer

AI-generated content may be incorrect. 

 

 

3.2  SIP Interfaces 

Index 

Name 

UDP 

TCP 

TLS 

TCP Keep‑alive 

Media Realm 

TLS Context 

Notes 

0 

SIPinterface_0 

— 

0 

0 

— 

— 

— 

Keep default (work‑around for firmware bug). 

1 

SIPTrunk 

5060 

0 

0 

— 

SIPTrunk 

— 

Production SIP trunk (UDP‑only). 

2 

Teams 

0 

0 

5061 

Enabled 

Teams 

Teams 

Microsoft Teams Direct Routing (TLS‑only). 

 

A screenshot of a computer

AI-generated content may be incorrect.
 

3.3  Proxy Sets & Addresses 

Proxy Sets 
Path: SIGNALING & MEDIA → CORE ENTITIES → Proxy Sets 

Index 

Name 

SBC IPv4 SIP Interface 

TLS Context 

Keep‑Alive 

Hot Swap 

LB Method 

1 

SIPTrunk 

SIPTrunk 

Default 

Using OPTIONS 

— 

— 

2 

Teams 

Teams 

Teams 

Using OPTIONS 

Enable 

Random Weights 

 

Proxy Addresses Proxy Set SIPTrunk 

Index 

Proxy Address 

Transport 

Priority 

Weight 

0 

siptrunk.com:5060 

UDP 

0 

0 

 

Proxy Set Teams 

Index 

Proxy Address 

Transport 

Priority 

Weight 

0 

sip.pstnhub.microsoft.com:5061 

TLS 

1 

1 

1 

sip2.pstnhub.microsoft.com:5061 

TLS 

2 

1 

2 

sip3.pstnhub.microsoft.com:5061 

TLS 

3 

1 

 

 

3.4 configuring Coder Groups 

 

3.5 Configuring IP Profiles 

Teams: 

 

 

SIPTrunk: 

 

 

 

3.6  IP Groups 

Path: SIGNALING & MEDIA → CORE ENTITIES → IP Groups – map each group to its SIP Interface, Proxy Set, Media Realm, and IP Profile. 
 

 

 

3.7 SRTP (Media Security) 

Path: SIGNALING & MEDIA → MEDIA → Media Security → set Media Security to Enable. 

 

3.8 Message Manipulations 

 

 

 

 

 

3.9 Configuring Message Condition Rules 

Name : Teams-Contact 

Condition : header.contact.url.host contains 'pstnhub.microsoft.com' 

 

3.10 Configuring Classification Rules 

 

 

3.11 Configuring IP-to-IP Call Routing Rules 

Path: SIGNALING & MEDIA → SBC → Routing → IP‑to‑IP Routing 

Add bidirectional rules SIPTrunk ⇆ Teams specifying the appropriate IP Groups, manipulations, and media security. 

Configure routing rules as shown in the table below:
