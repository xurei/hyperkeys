package gkm;

import org.jnativehook.mouse.NativeMouseEvent;
import org.jnativehook.mouse.NativeMouseInputListener;
import org.jnativehook.mouse.NativeMouseWheelEvent;
import org.jnativehook.mouse.NativeMouseWheelListener;

public class GlobalMouseListener implements NativeMouseInputListener, NativeMouseWheelListener
{
	public void nativeMouseClicked(NativeMouseEvent e)
	{
		System.out.println("mouse.clicked:" + e.getClickCount());
	}

	public void nativeMousePressed(NativeMouseEvent e)
	{
		System.out.println("mouse.pressed:" + e.getButton());
	}

	public void nativeMouseReleased(NativeMouseEvent e)
	{
		System.out.println("mouse.released:" + e.getButton());
	}

	public void nativeMouseMoved(NativeMouseEvent e)
	{
		System.out.println("mouse.moved:" + e.getX() + "," + e.getY());
	}

	public void nativeMouseDragged(NativeMouseEvent e)
	{
		System.out.println("mouse.dragged:" + e.getX() + "," + e.getY());
	}

	public void nativeMouseWheelMoved(NativeMouseWheelEvent e)
	{
		StringBuilder result = new StringBuilder();
		result.append(e.getWheelRotation());
		result.append(",");
		result.append(e.getScrollAmount());
		result.append(",");
		switch (e.getScrollType()) {
			case 1:
				result.append("WHEEL_UNIT_SCROLL");
				break;
			case 2:
				result.append("WHEEL_BLOCK_SCROLL");
				break;
			default:
				result.append("UNKNOWN");
		}

		System.out.println("mouse.wheel.moved:" + result);
	}
}