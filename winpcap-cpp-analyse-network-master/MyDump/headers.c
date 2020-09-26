#ifdef _MSC_VER
#define _CRT_SECURE_NO_WARNINGS
#endif

#include "pcap.h"

typedef struct eth_address
{
	u_char byte1;
	u_char byte2;
	u_char byte3;
	u_char byte4;
	u_char byte5;
	u_char byte6;
}eth_address;

/* 4 bytes IP address */
typedef struct ip_address
{
	u_char byte1;
	u_char byte2;
	u_char byte3;
	u_char byte4;
}ip_address;


/* IPv4 header */
typedef struct ip_header
{
	u_char	ver_ihl;		// Version (4 bits) + Internet header length (4 bits)
	u_char	tos;			// Type of service 
	u_short tlen;			// Total length 
	u_short identification; // Identification
	u_short flags_fo;		// Flags (3 bits) + Fragment offset (13 bits)
	u_char	ttl;			// Time to live
	u_char	proto;			// Protocol
	u_short crc;			// Header checksum
	ip_address	saddr;		// Source address
	ip_address	daddr;		// Destination address
	u_int	op_pad;			// Option + Padding
}ip_header;

/* UDP header*/
typedef struct udp_header
{
	u_short sport;			// Source port
	u_short dport;			// Destination port
	u_short len;			// Datagram length
	u_short crc;			// Checksum
}udp_header;

/* MAC header*/
typedef struct eth_header
{
	eth_address daddr;
	eth_address saddr;
	u_short type;
}eth_header;


typedef struct arp_header
{
	u_short hardtype;			//Ӳ�������ֶ�
	u_short prototype;			//Э�������ֶ�
	u_char htlen;				//Ӳ����ַ�ĳ���,���ֽ�Ϊ��λ.������̫����IP��ַ��ARP�����Ӧ����˵,���ǵ�ֵΪ6
	u_char ptlen;				//Э���ַ�ĳ���,���ֽ�Ϊ��λ.������̫����IP��ַ��ARP�����Ӧ����˵,���ǵ�ֵΪ4
	u_short op;					//�����ֶ�
	eth_address arp_esa;		//���Ͷ�MAC��ַ
	ip_address arp_isa;			//���Ͷ�IP��ַ
	eth_address arp_eda;		//Ŀ�Ķ�MAC��ַ
	ip_address arp_ida;			//Ŀ�Ķ�IP��ַ
}arp_header;


typedef struct icmp_header
{
	u_char type;				//ICMP��������
	u_char code;				//����
	u_short checksum;			//У���
	u_short identifier;			//��ʶ��
	u_short sequence_number;	//���к�
}icmp_header;

/* TCP header */
typedef struct tcp_header
{
	u_short	sport;					//Դ�˿�
	u_short dport;					//Ŀ�Ķ˿�
	u_long  sequence_number;		//��ţ�4�ֽ�ntohl��  
	u_long  acknowlegement_number;	//ȷ�Ϻ�
	u_short hlen_bl_flags;			//����ƫ��+����+����λ
	u_short window_size;			//���ڣ����ͷ��Լ��Ľ��մ��ڣ�
	u_short checksum;				//����ͣ��ײ�+���ݣ�
	u_short urg;					//����ָ��
	u_long  option;					//��ѡ+���
}tcp_header;

typedef struct dns_packet //����head+data
{
    u_short id;		//ÿһ��ռ2���ֽڣ���12���ֽ�
    u_short flags;	//��־��һ��Ϊ0�����ѯ����
    u_short ques;
    u_short answer;	
    u_short author;	
    u_short addition;
    u_char dns_data;	//��ѯ���ⲿ��
}dns_packet;