#ifdef _MSC_VER
#define _CRT_SECURE_NO_WARNINGS
#endif

#include "pcap.h"
#include "headers.c"
#define DNSPORT 53

//���������Ϣ
void myPrintBaseInfo(const struct pcap_pkthdr *header)
{
	struct tm *ltime;
	char timestr[16];
	time_t local_tv_sec;
	
	local_tv_sec = header->ts.tv_sec;
	ltime=localtime(&local_tv_sec);
	strftime(timestr, sizeof timestr, "%H:%M:%S", ltime);
	printf("\n\n\n\n������Mac֡��ʱ�䣺%s.%.6d   MAC֡����:%d Byte(s)\n", timestr, header->ts.tv_usec, header->len);  /* �����ֽ�Ϊ��λ */
}

//���Ӳ����ַ
void myPrintEthAddress(eth_address eth)
{
	printf("%02X:%02X:%02X:%02X:%02X:%02X", 
		eth.byte1,
		eth.byte2,
		eth.byte3,
		eth.byte4,
		eth.byte5,
		eth.byte6
	);
}

//���IP��ַ
void myPrintIPAddress(ip_address ia)
{
	printf("%d.%d.%d.%d", 
		ia.byte1,
		ia.byte2,
		ia.byte3,
		ia.byte4
	);
}

//��������Э������
void myPrintNetType(u_short type)
{
	printf("�����Э�飺 ");
	if(type==0x0800)
		printf("IPЭ��");
	else if(type==0x0806)
		printf("ARPЭ��");
	else if(type==0x8035)
		printf("RARPЭ��");
	else
		printf("���յ��Ǳ������ܴ���������Э�����ͣ�");
	printf("\n");
}

/*
	����Mac֡��
		�����
			�����Э�����ͣ�ԴMAC -> Ŀ��MAC
		
		���أ�
			�����Э������
*/
u_short handleMac(eth_header *eth)
{
	u_short type=ntohs(eth->type);	
	printf("Mac��ַ�� ");
	myPrintEthAddress(eth->saddr);
	printf("->");
	myPrintEthAddress(eth->daddr);
	printf("\n\n");
	return type;
}

void handleARPAndRARP(arp_header *ah)
{
	u_short arp_ht;			//Ӳ����ַ������.����ֵΪ1����ʾ��̫����ַ
	u_short arp_pt;			//Ҫӳ���Э���ַ����.����ֵΪ0x0800������ʾIP��ַ
	u_short arp_op;			//���ֲ�������,������ARP����(ֵΪ1)��ARPӦ��(ֵΪ2)��RARP����(ֵΪ3)��RARPӦ��(ֵΪ4)
	arp_ht=ntohs(ah->hardtype);				//Ӳ����ַ������.����ֵΪ1����ʾ��̫����ַ
	arp_pt=ntohs(ah->prototype);			//Ҫӳ���Э���ַ����.����ֵΪ0x0800������ʾIP��ַ
	arp_op=ntohs(ah->op);
	
	printf("Ӳ����ַ����Ϊ��%d\t\t\t",arp_ht);
	printf("Э���ַ����Ϊ��0x%04X\n",arp_pt);
	printf("Ӳ����ַ����Ϊ��%d\t\t\t",ah->htlen);
	printf("Э���ַ����Ϊ��%d\n",ah->ptlen);
	if (arp_op == 1){
		printf("��������Ϊ��ARP�����ġ�\n����Mac��ַ��");
		myPrintEthAddress(ah->arp_esa);
		printf("\t��������");
		myPrintIPAddress(ah->arp_ida);
		printf("��Mac��ַ\n");
	}
	
	if (arp_op == 2){
		printf("��������Ϊ��ARPӦ���ġ�\nӦ�𷽵�Mac��ַ��");
		myPrintEthAddress(ah->arp_eda);
		printf("\tӦ�𷽵�IP��ַ");
		myPrintIPAddress(ah->arp_ida);
		printf("\n");
	}

	if (arp_op == 3)
		printf("��������Ϊ��RARP������\n");
	if (arp_op == 4)
		printf("��������Ϊ��RARPӦ����\n");
}

int all_ip_len = 20;

u_short handleIP(ip_header *ih)
{
	u_int ip_ver;		//�汾
	u_int ip_len;		//�ײ�����
	u_short ip_tlen;    //�ܳ���
	u_short ip_ident;	//��ʶ
	u_short ip_flag_fo; //��־��Ƭƫ��
	u_int ip_flag;		//��־��3λ��ֵΪ2���з�Ƭ�������Ƭ,1���ܷ�Ƭ,0û�з�Ƭ�������Ƭ��
	u_int ip_fo;		//Ƭƫ��
	u_short ip_type;	//Э��
	u_short ip_crc;		//�ײ������
	u_long ip_op_pad;	//��ѡ��

	/* retireve the position of the ip header *///����IP�ײ���λ��
	ip_ver = (ih->ver_ihl >> 4);			//�汾
	ip_len = (ih->ver_ihl & 0xf) * 4;		//�ײ����ȣ������㣬����ֻȡipͷ���İ汾�����ֶεĺ�4λ
	ip_tlen=ntohs(ih->tlen);				//�ܳ���
	ip_ident=ntohs(ih->identification);		//��ʶ
	ip_flag_fo = ntohs(ih->flags_fo);		//2�ֽڴ�ţ������ֽ�������
	ip_flag = (ip_flag_fo >> 13);			//��־
	ip_fo = (ip_flag_fo & 0x1fff);			//Ƭƫ��
	ip_type = ih->proto;					//�ϲ�Э������
	ip_crc = ntohs(ih->crc);				//�ײ�У���

	/*��ӡIP���ݱ��ײ�*/
	printf("�汾��%d\t\t\t",ip_ver);
	printf("�ײ����ȣ�%d\n",ip_len);
	printf("���ַ���%d\t\t", ih->tos);
	printf("�ܳ��ȣ�%d\n", ip_tlen);
	printf("��ʶ��%d\t\t", ip_ident);
	if (ip_flag == 2)
		printf("��־��DF=1�����ܷ�Ƭ����MF=0��û�к�����Ƭ��\n");
	if (ip_flag == 1)
		printf("��־��DF=0�������Ƭ����MF=1�����к�����Ƭ��\n");
	if (ip_flag == 0)
		printf("��־��DF=0�������Ƭ����MF=0��û�к�����Ƭ��\n");
	printf("Ƭƫ�ƣ�%d\t\t",ip_fo*8);//Ƭƫ����8�ֽ�Ϊ��λ
	printf("����ʱ�䣺%d\n",ih->ttl);
	printf("Э�飺%d\t\t\t",ih->proto);
	printf("�ײ�У��ͣ�%d\n",ip_crc);

	printf("IP��ַ��  ");

	myPrintIPAddress(ih->saddr);
	printf(" -> ");
	myPrintIPAddress(ih->daddr);
	printf("\n");
	if (ip_len == 20)//IP�ײ�����>20ʱ����
		printf("�ײ�����Ϊ20��IP�����ײ�û�п�ѡ�ֶΡ�\n");
	else{
		ip_op_pad = ntohl(ih->op_pad);
		printf("��ѡ�Զ�����Ϊ��%u\n", ip_op_pad);
	}
	all_ip_len = ip_len;

	return ip_type;
}

void handleICMP(icmp_header *ich)
{
	u_short icmp_checksum;		//У���
	u_short icmp_ident;			//��ʶ��
	u_short icmp_seqnum;		//���к�

	icmp_checksum = ntohs(ich->checksum);				//У���
	icmp_ident = ntohs(ich->identifier);				//��ʶ��
	icmp_seqnum = ntohs(ich->sequence_number);

	printf("\n�����Э�飺  ICMPЭ��\n");

	/*��ӡICMP�����ײ�*/
	if (ich->type == 0)
		printf("ICMP���ͣ�����Ӧ��\n");
	else if (ich->type == 8)
		printf("ICMP���ͣ���������\n");
	else
		printf("ICMP���ͣ�����\n");
	printf("���룺%d\t\t",ich->code);
	printf("У��ͣ�%d\n",icmp_checksum);
	printf("��ʶ����%d\t\t",icmp_ident);
	printf("���кţ�%d\n",icmp_seqnum);
}

u_int udp_len;

bool handleUDP(udp_header *uh)
{
	u_short sport, dport;//�˿�
	u_short uh_len;		 //����
	u_short uh_crc;		 //У���

	sport = ntohs( uh->sport );//Դ�˿�
	dport = ntohs( uh->dport );//Ŀ�Ķ˿�
	uh_len = ntohs(uh->len);	//����
	uh_crc = ntohs(uh->crc);	//У���
	printf("\n�����Э�飺  UDPЭ��\n");
	printf("�˿ںţ�%d -> %d\n", sport, dport);
	printf("���ȣ�%d\t\t", uh_len);
	printf("У��ͣ�%d\n", uh_crc);

	udp_len = uh_len;
	
	if(sport == DNSPORT || dport == DNSPORT)
		return true;
	return false;
}

void handleTCP(tcp_header *th)
{
	u_short	tcp_sport;			//Դ�˿�
	u_short tcp_dport;			//Ŀ�Ķ˿�
	u_long  tcp_seqnum;			//��ţ�4�ֽ�ntohl��  
	u_long  tcp_acknum;			//ȷ�Ϻ�
	u_short tcp_hlen_bl_flags;	//����ƫ��+����+����λ
	u_short  tcp_hlen;
	u_short  tcp_bl;		
	u_short  tcp_flags_urg;		//����1��Ч 
	u_short  tcp_flags_ack;		//ȷ��=1ʱ��ȷ�Ϻ���Ч
	u_short  tcp_flags_psh;		//����1��Ч�����Բ�����������ͷ���
	u_short  tcp_flags_rst;		//��λ1��Ч�����½�������
	u_short  tcp_flags_syn;		//ͬ��syn=1,ack=0ʱ����������һ�����������ģ�syn=1,ack=1,������������
	u_short  tcp_flags_fin;		//�ͷ�����=1ʱ����ʾ���ݱ�
	u_short tcp_window_size;	//���ڣ����ͷ��Լ��Ľ��մ��ڣ�
	u_short tcp_checksum;		//����ͣ��ײ�+���ݣ�
	u_short tcp_urg;			//����ָ��
	u_long tcp_option;	

	tcp_sport=ntohs(th->sport);					//Դ�˿�
	tcp_dport=ntohs(th->dport);					//Ŀ�Ķ˿�
	tcp_seqnum=ntohl(th->sequence_number);		//��ţ�4�ֽ�ntohl��  
	tcp_acknum=ntohl(th->acknowlegement_number);//ȷ�Ϻ�
	tcp_hlen_bl_flags=ntohs(th->hlen_bl_flags);	//����ƫ��4+����6+����λ6
	tcp_hlen=(tcp_hlen_bl_flags >> 12)*4;		//��4�ֽ�Ϊ��λ
	tcp_bl=(tcp_hlen_bl_flags & 0x0fc0);		//����
	tcp_flags_urg=((tcp_hlen_bl_flags >> 5) & 0x0001);	//����1��Ч                                                    ----- 
	tcp_flags_ack=((tcp_hlen_bl_flags >> 4) & 0x0001);	//ȷ��=1ʱ��ȷ�Ϻ���Ч
	tcp_flags_psh=((tcp_hlen_bl_flags >> 3) & 0x0001);	//����1��Ч�����Բ�����������ͷ���
	tcp_flags_rst=((tcp_hlen_bl_flags >> 2) & 0x0001);	//��λ1��Ч�����½�������
	tcp_flags_syn=((tcp_hlen_bl_flags >> 1) & 0x0001);	//ͬ��syn=1,ack=0ʱ����������һ�����������ģ�syn=1,ack=1,������������
	tcp_flags_fin=(tcp_hlen_bl_flags & 0x0001);	//�ͷ�����=1ʱ����ʾ���ݱ�
	tcp_window_size=ntohs(th->window_size);		//���ڣ����ͷ��Լ��Ľ��մ��ڣ�
	tcp_checksum=ntohs(th->checksum);			//����ͣ��ײ�+���ݣ�
	tcp_urg=ntohs(th->urg);	

	printf("\n�����Э�飺  TCPЭ��\n");

	/*��ӡTCP���ݱ��ײ�*/
	printf("�˿ںţ�%d -> %d\n",tcp_sport,tcp_dport);
	printf("��ţ�%u\t",tcp_seqnum);
	printf("ȷ�Ϻţ�%u\n",tcp_acknum);
	printf("����ƫ�ƣ�%d\t\t",tcp_hlen);//�ײ�����
//	printf("������%d\n",tcp_bl);
	/*�����ֶ�,��־λ*/
	if (tcp_flags_urg == 1)
		printf("��־��URG\n");
	if (tcp_flags_ack == 1)
		printf("��־��ACK\n");
	if (tcp_flags_psh == 1)
		printf("��־��PSH\n");
	if (tcp_flags_rst == 1)
		printf("��־��RST\n");
	if (tcp_flags_syn == 1)
		printf("��־��SYN\n");
	if (tcp_flags_fin == 1)
		printf("��־��FIN\n");
	printf("���ڣ�%d\t\t",tcp_window_size);
	if (tcp_flags_ack == 1)
		printf("����ͣ�%d\n",tcp_checksum);
	printf("����ָ�룺%d\t\t",tcp_urg);//URG=1ʱ�����ã����ڴ�СΪ0Ҳ�ܷ���
	if(tcp_hlen == 20)//����ƫ��(TCP�ײ�����)>20ʱ����
		printf("�ײ�����Ϊ20�ֽڣ�û������ֶΡ�\n");
	else {
		tcp_option = ntohl(th->option);
		printf("����ֶ�:%u\n", tcp_option);
	}
}

/* Callback function invoked by libpcap for every incoming packet */
void packet_handler(u_char *param, const struct pcap_pkthdr *header, const u_char *pkt_data)   //param ����
{

	eth_header *eth;
	u_short macType;

	myPrintBaseInfo(header);

	eth=(eth_header *) (pkt_data);

	//������̫��ͷ��
	pkt_data += 14;

	//HandleMac
	macType=handleMac(eth);
	myPrintNetType(macType);

	// ����ARP �� RARP
	if(macType==0x0806 || macType==0x8035)
	{
		arp_header *ap;
		ap = (arp_header *)(pkt_data);
		handleARPAndRARP(ap);
	}

	// ����IP
	if(macType==0x0800)
	{
		u_short ip_type;
		ip_header *ih;
		ih = (ip_header *) (pkt_data);	
		ip_type = handleIP(ih);

		if (ip_type == 1) {
			icmp_header *ich;
			ich = (icmp_header *)((u_char*)ih + all_ip_len);
			handleICMP(ich);
		}else if(ip_type == 17){
			udp_header *uh;
			uh = (udp_header *) ((u_char*)ih + all_ip_len);
			
			
			if(handleUDP(uh))
			{
				/*
				struct dns_packet *pdns;
				pdns = (struct dns_packet *)(pkt_data + all_ip_len + udp_len); // sport+dport+length+checksum,DNSͷָ��
 
				u_char *query=&(pdns->dns_data);//��λ����ѯ����ͷ��
				printf("QueryDomain=");
				u_char domainname[100]={0};
 
				u_int i=0;
				//query++;//�ѵ�ȥ��

				while(*query)
				{

					printf("%d", *query);

					if(*query < 0x10)//48�Ժ�������ֺ�Ӣ����ĸ
						printf(".");
					else
						printf("%c", *query);
					query++;
					i++;
				}

				printf("\n"); */
				
			}
		}else if(ip_type == 6){
			tcp_header *th;
			th=(tcp_header *) ((u_char*)ih + all_ip_len);
			handleTCP(th);
		}
	}
}

int main()
{
	pcap_if_t *alldevs;
	pcap_if_t *d;
	int inum;
	int handType;
	pcap_t *adhandle;
	char errbuf[PCAP_ERRBUF_SIZE];
	u_int netmask;
	char *packet_filter;
	packet_filter = new char[100];
	int i = 0;
	
	
	
	printf("1��\t����IP���ݱ�\n");
	printf("2��\t����ARP���ݱ�\n");
	printf("3��\t����TCP���ݱ�\n");
	printf("4��\t����UDP���ݱ�\n");
	printf("5��\t����ICMP���ݱ�\n");
	printf("6��\t����MAC��IP��ARP��TCP��UDP��IMCP\n");

	printf("�����������Э�����ͣ�");
	scanf("%d", &handType);


	if(handType == 1)
		packet_filter = "ip";
	else if(handType == 2)
		packet_filter = "arp";
	else if(handType == 3)
		packet_filter = "ip and tcp";
	else if(handType == 4)
		packet_filter = "ip and udp";
	else if(handType == 5)
		packet_filter = "ip and icmp";
	else if(handType == 6)
		packet_filter = "";
	else{
		printf("InputError : check the number you input! exit(1)");
		exit(1); 
	}
	
	struct bpf_program fcode;
	
	if(pcap_findalldevs(&alldevs, errbuf) == -1)
	{
		fprintf(stderr,"Error in pcap_findalldevs: %s\n", errbuf);
		exit(1);
	}
	
	for(d=alldevs; d; d=d->next)
	{
		printf("%d. %s", ++i, d->name);
		if (d->description)
			printf(" (%s)\n", d->description);
		else
			printf(" (No description available)\n");
	}

	if(i==0)
	{
		printf("\nNo interfaces found! Make sure WinPcap is installed.\n");
		return -1;
	}
	
	printf("Enter the interface number (1-%d):",i);
	scanf("%d", &inum);
	
	/* Check if the user specified a valid adapter */
	if(inum < 1 || inum > i)
	{
		printf("\nAdapter number out of range.\n");
		pcap_freealldevs(alldevs);
		return -1;
	}

	/* Jump to the selected adapter */
	for(d=alldevs, i=0; i< inum-1 ;d=d->next, i++);

	/* Open the adapter */
	if ((adhandle= pcap_open_live(d->name,	// name of the device
							 65536,			// portion of the packet to capture. 
											// 65536 grants that the whole packet will be captured on all the MACs.
							 1,				// promiscuous mode (nonzero means promiscuous)
							 1000,			// read timeout
							 errbuf			// error buffer
							 )) == NULL)
	{
		fprintf(stderr,"\nUnable to open the adapter. %s is not supported by WinPcap\n");
		pcap_freealldevs(alldevs);
		return -1;
	}
	
	/* Check the link layer. We support only Ethernet for simplicity. */
	if(pcap_datalink(adhandle) != DLT_EN10MB)
	{
		fprintf(stderr,"\nThis program works only on Ethernet networks.\n");
		pcap_freealldevs(alldevs);
		return -1;
	}
	
	if(d->addresses != NULL)
		/* Retrieve the mask of the first address of the interface */
		netmask=((struct sockaddr_in *)(d->addresses->netmask))->sin_addr.S_un.S_addr;
	else
		/* If the interface is without addresses we suppose to be in a C class network */
		netmask=0xffffff; 


	//compile the filter
	if (pcap_compile(adhandle, &fcode, packet_filter, 1, netmask) <0 )
	{
		fprintf(stderr,"\nUnable to compile the packet filter. Check the syntax.\n");
		pcap_freealldevs(alldevs);
		return -1;
	}
	
	//set the filter
	if (pcap_setfilter(adhandle, &fcode)<0)
	{
		fprintf(stderr,"\nError setting the filter.\n");
		pcap_freealldevs(alldevs);
		return -1;
	}
	
	printf("\nlistening on %s...\n", d->description);
	
	/* At this point, we don't need any more the device list. Free it */
	pcap_freealldevs(alldevs);
	
	/* start the capture */
	pcap_loop(adhandle, 0, packet_handler, NULL);
	
	return 0;
}
