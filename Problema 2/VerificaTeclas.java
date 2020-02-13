import java.util.Scanner;
import java.util.ArrayList;
import java.lang.Math;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.text.DecimalFormat;

public class Main {

	public static void main(String[] args) {
		float tempoTecla = (float) 0.01;
		int count = 0;
	    ArrayList<String> palavras = new ArrayList<String>();
		
		try {
	        Scanner scanner = new Scanner(System.in);
	        count = scanner.nextInt();
	        int i = 0;
	        while(i < count) {
	        	String palavra = scanner.next();
	        	if(palavra.length() < 9 || palavra.length() > 10000) {
		        	System.out.println("Palavra deve conter entre 9 e 10.000 letras");
		        	return;
	        	}
		        palavras.add(palavra);
		        i++;
	        }
	        palavras.forEach(palavra -> {
	        	double result = palavra.length() * tempoTecla;
	        	BigDecimal bd = new BigDecimal(result).setScale(2, RoundingMode.HALF_EVEN);
	        	result = bd.doubleValue();
	        	DecimalFormat df = new DecimalFormat("0.00");
	        	System.out.print(df.format(result)+" ");
	        });		} catch (Exception e) {
			System.out.println("Entrada incorreta");
		}
	}
}