import Env from '@ioc:Adonis/Core/Env'
import Logger from '@ioc:Adonis/Core/Logger'
import axios, { AxiosError } from 'axios'

export default class NotificationService {
  private static API_URL = Env.get('NOTIFICATION_API_URL')

  /**
   * Envía notificación cuando se crea un nuevo departamento
   */
  public static async sendDepartmentCreatedNotification(
    departmentName: string,
    recipientEmail: string,
    departmentId: number
  ) {
    try {
      const response = await axios.post(
        `${this.API_URL}/notifications/department-created`,
        {
          department_name: departmentName,
          department_id: departmentId,
          recipient_email: recipientEmail,
          timestamp: new Date().toISOString()
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )

      Logger.info(`Notification sent to ${recipientEmail} for department ${departmentName}`)
      return response.data
    } catch (error) {
      const axiosError = error as AxiosError
      Logger.error(`Notification failed: ${axiosError.message}`)
      throw new Error('Failed to send department creation notification')
    }
  }
}