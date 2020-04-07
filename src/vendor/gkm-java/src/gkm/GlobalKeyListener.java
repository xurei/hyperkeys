package gkm;

import org.jnativehook.NativeHookException;
import org.jnativehook.GlobalScreen;
import org.jnativehook.keyboard.NativeKeyEvent;
import org.jnativehook.keyboard.NativeKeyListener;
import java.lang.StringBuilder;
import java.awt.Toolkit;
import java.awt.event.KeyEvent;

public class GlobalKeyListener implements NativeKeyListener
{
	public void nativeKeyPressed(NativeKeyEvent e)
	{
		System.out.println(buildEventJSON(e, "press"));
	}

	public void nativeKeyReleased(NativeKeyEvent e)
	{
		System.out.println(buildEventJSON(e, "release"));
	}

	public void nativeKeyTyped(NativeKeyEvent e)
	{
		System.out.println(buildEventJSON(e, "release"));
	}

	private String buildEventJSON(NativeKeyEvent e, String type) {
		Toolkit toolkit = Toolkit.getDefaultToolkit();
		boolean isNumLock = toolkit.getLockingKeyState(KeyEvent.VK_NUM_LOCK);
		boolean isCapsLock = toolkit.getLockingKeyState(KeyEvent.VK_CAPS_LOCK);
		boolean isScrollLock = toolkit.getLockingKeyState(KeyEvent.VK_SCROLL_LOCK);

		String keyChar = ""+e.getKeyChar();
		String keyText = e.getKeyText(e.getKeyCode());

		if (65535 == (int)e.getKeyChar()) {
			keyChar = "null";
		}
		else if ("\"".equals(keyChar)) {
			keyChar = "\\\"";
		}
		if (keyText.startsWith("NumPad ")) {
			String numpadChar = keyText.substring(7);
			char c = numpadChar.charAt(0);
			if ('0' <= c && c <= '9') {
				if (isNumLock) {
					keyChar = numpadChar;
				}
			}
			else {
				if ("Add".equals(numpadChar)) {
					keyChar = "+";
				}
				else if ("Subtract".equals(numpadChar)) {
					keyChar = "-";
				}
				else if ("Multiply".equals(numpadChar)) {
					keyChar = "*";
				}
				else if ("Divide".equals(numpadChar)) {
					keyChar = "/";
				}
				else if ("Separator".equals(numpadChar)) {
					keyChar = ".";
				}
			}
		}
		if (!"null".equals(keyChar)) {
			keyChar = "\""+keyChar+"\"";
		}

		StringBuilder str = new StringBuilder();
		str.append("{\"type\":\"").append(type).append("\",");
		str.append("\"modifiers\":{");
		{
			str.append("\"numLock\":").append(isNumLock).append(",");
			str.append("\"capsLock\":").append(isCapsLock).append(",");
			str.append("\"scrollLock\":").append(isScrollLock);
		}
		str.append("},");
		str.append("\"rawCode\":").append(e.getRawCode()).append(",");
		str.append("\"keyCode\":").append(e.getKeyCode()).append(",");
		str.append("\"keyChar\":").append(keyChar).append(",");
		str.append("\"keyText\":\"").append(keyText).append("\"");
		str.append("}");
		return str.toString();
	}
}
